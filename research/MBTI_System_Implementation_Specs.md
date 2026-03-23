# 人格分析系統實作規格書 (Implementation Specifications)

> [!IMPORTANT]
> **文件性質**：可執行的技術規格 (Executable Specs)
> **包含內容**：1. 資料庫 Schema, 2. 決策引擎邏輯, 3. 技術手冊大綱。

---

## Part 1: 資料庫 Schema 設計 (NoSQL/JSON 結構)

### 1.1 Item Bank (題庫表)
儲存題目及其心理測量參數 (IRT)。

```json
{
  "item_id": "step2_E_initiating_01",
  "content": {
    "zh_TW": "在社交場合中，我通常是那個會主動走向陌生人並開啟話題的人。",
    "en_US": "In social situations, I am usually the one to approach strangers and start a conversation."
  },
  "dimension_key": "E_I",
  "facet_key": "initiating_receiving",
  "item_type": "likert_5",
  "is_reverse": false,
  "irt_params": {
    "model": "GRM",
    "a": 1.25,        // 鑑別力 (Discriminability)
    "b": [-1.5, -0.5, 0.5, 1.5], // 閾值 (Thresholds)
    "sem_curve": [...] // 預計算的標準誤曲線
  },
  "tags": ["social", "behavioral"],
  "validity_flags": {
    "is_anchor": true, // 是否為錨題
    "dif_gender": false // 是否有性別差異
  }
}
```

### 1.2 Assessment Session (作答紀錄表)
儲存單次測驗的原始數據與品質指標。

```json
{
  "session_id": "sess_20240202_001",
  "user_id": "user_123",
  "timestamp_start": "2024-02-02T10:00:00Z",
  "timestamp_end": "2024-02-02T10:15:00Z",
  "responses": [
    {
      "item_id": "step2_E_initiating_01",
      "value": 5,
      "latency_ms": 3500 // 作答時間
    }
  ],
  "rqs_metrics": {
    "completion_time": 900,
    "long_string_index": 3, // 最長連續相同選項數
    "inconsistency_score": 0.1, // 反向題矛盾率
    "bidr_im_score": 4, // 印象管理分數
    "bidr_sde_score": 2 // 自我欺瞞分數
  },
  "status": "completed" // or "flagged_invalid"
}
```

### 1.3 Analysis Report (分析報告表)
儲存計算後的四層輸出向量。

```json
{
  "report_id": "rep_20240202_001",
  "session_id": "sess_20240202_001",
  "type_layer": {
    "tcv": [
      {"type": "INTJ", "probability": 0.72},
      {"type": "INFJ", "probability": 0.18},
      {"type": "ENTJ", "probability": 0.05}
    ],
    "dimensions": {
      "E_I": {"score": -0.8, "pci": 0.9, "sem": 0.15},
      "S_N": {"score": -1.2, "pci": 0.95, "sem": 0.10}
      // ...
    },
    "facets": {
      "initiating_receiving": {"score": -0.5, "clarity": "midzone"},
      "expressive_contained": {"score": -1.5, "clarity": "clear"}
      // ...
    }
  },
  "function_layer": {
    "strengths": {
      "Ni": 0.92, "Te": 0.78, "Fi": 0.45, "Se": 0.35,
      "Ne": 0.20, "Ti": 0.60, "Fe": 0.15, "Si": 0.40
    },
    "alignment_score": 0.85,
    "grip_type": "Se_Grip"
  },
  "context_layer": {
    "drift_vectors": [
      {"context": "work", "drift_type": "ENTJ", "intensity": 0.4}
    ]
  }
}
```

---

## Part 2: 決策引擎規則 (Decision Engine Logic)

### 2.1 TCV 計算邏輯 (Type Confidence Vector)
目標：將分數轉換為機率分佈。

```python
def calculate_tcv(dimension_scores, sem_weights, grip_calibration):
    # 1. 基礎 Softmax 分數
    # dimension_scores: [-0.8, -1.2, 0.5, 0.9] (I, N, T, J)
    raw_logits = map_to_16_types(dimension_scores)
    
    # 2. SEM 降權 (不確定性懲罰)
    # 如果某維度 SEM 很大，則該維度的貢獻度降低
    for dim, score in dimension_scores.items():
        if sem_weights[dim] > 0.4:
             apply_uncertainty_penalty(raw_logits, dim)
             
    # 3. Grip 校準 (動力學校正)
    # 如果 Grip 顯示 Se Grip (INTJ/INFJ 特徵)，則提升 INxj 機率
    if grip_calibration.is_compatible(raw_logits.top_1_type):
        raw_logits[raw_logits.top_1_type] += 0.2
    else:
        # Grip 不符 (e.g., INTJ 但出現 Fe Grip) -> 提升 INFJ/ISFJ
        compatible_types = get_grip_compatible_types(grip_calibration.grip_type)
        raw_logits[compatible_types] += 0.15
        
    # 4. 歸一化輸出
    tcv = softmax(raw_logits, temperature=1.0)
    return tcv
```

### 2.2 RQS 守門規則 (Response Quality Gate)
目標：攔截無效數據。

```python
def check_quality(session):
    flags = []
    
    # 1. 極速作答 (每題 < 2秒)
    if session.avg_latency < 2000:
        flags.append("TOO_FAST")
        
    # 2. 直線作答 (連續 10 題選一樣)
    if session.long_string_index > 10:
        flags.append("STRAIGHT_LINING")
        
    # 3. 社會期許 (BIDR IM 高分)
    if session.rqs_metrics.bidr_im_score > 8:
        flags.append("HIGH_SOCIAL_DESIRABILITY")
        
    # 決定
    if len(flags) >= 2:
        return {"action": "REJECT", "reason": flags}
    elif "HIGH_SOCIAL_DESIRABILITY" in flags:
        return {"action": "ACCEPT_WITH_WEIGHT_REDUCTION", "weight": 0.7}
    else:
        return {"action": "ACCEPT", "weight": 1.0}
```

---

## Part 3: 技術手冊大綱 (Technical Manual Outline)

這份手冊是為了讓系統符合 `Standards (2014)`。

### Chapter 1: Introduction (緒論)
*   1.1 System Purpose: 研究級人格分析與勝任力預測。
*   1.2 Target Population: 成年人 (18+)。
*   1.3 Theory Framework: 榮格功能、MBTI Step II、Trait Theory。

### Chapter 2: Construction (建構過程)
*   2.1 Item Development: 題庫來源 (IPIP/Custom)、專家效度。
*   2.2 IRT Calibration: GRM 模型設定、參數估計樣本描述。
*   2.3 CAT Algorithm: 選題策略 (Max Info) 與停題規則 (SEM < 0.3)。

### Chapter 3: Reliability (信度)
*   3.1 Internal Consistency: Cronbach's Alpha & IRT Reliability.
*   3.2 SEM & Information Functions: 各維度的測量誤差曲線。
*   3.3 Test-Retest: 30天重測相關係數。

### Chapter 4: Validity (效度)
*   4.1 Construct Validity: 與 Big Five 的相關矩陣 (CFA)。
*   4.2 Criterion Validity: 與工作績效/領導力的關聯證據。
*   4.3 Response Processes: RQS 機制與作答偏誤控制。

### Chapter 5: Interpretation (解釋規範)
*   5.1 TCV Interpretation: 信心指數的意義。
*   5.2 Contextual Drift: 如何解讀工作 vs 生活的差異。
*   5.3 Ethical Use: 避免就業歧視與標籤化。
