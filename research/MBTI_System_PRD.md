# 人格分析系統技術規格書 (Product Requirements Document)

> [!IMPORTANT]
> **文件性質**：系統開發規格書 (PRD)
> **目標**：構建一套超越市面 MBTI 測驗的研究級人格分析系統 (Research-Grade Personality Analysis System)。
> **核心差異**：多層次模型 (Type+Trait+Function)、不確定性輸出 (SEM/CI)、作答偏誤校正 (RQS)、可迭代題庫 (IRT/CAT)。

---

## 1. 系統目標 (System Goals)
本系統必須能回答關於受測者的四個核心問題：
1.  **Structure**: 你偏好什麼人格結構？(Type / Trait / Function 向量)
2.  **Certainty**: 你有多確定？(SEM / CI / TCV)
3.  **Context**: 你在什麼情境會漂移？(Contextual Drift)
4.  **Dynamics**: 你的盲點與壓力動力怎麼運作？(Grip / Resilience)

---

## 2. 系統輸出定義 (System Output Vectors)

### Output A: Type Layer (MBTI)
*   **Step I**: E/I, S/N, T/F, J/P 偏好強度。
*   **Step II**: 20 Facets Profile (每 Facet 含分數、百分位、清晰度 PCI、SEM/CI)。
*   **TCV (Type Confidence Vector)**: 候選類型機率分佈 (Top-k)。
    *   *Example*: `INTJ 0.62 | INFJ 0.23 | ENTJ 0.15`

### Output B: Function Layer (8 Functions)
*   **Continuum**: 八維功能連續強度向量 (0.00 - 1.00 或 z-score)。
*   **Alignment**: 與推定類型堆疊的一致性分數。
*   **Risks**: 迴圈 (Loop) 或過度補償風險提示。

### Output C: Trait Layer (Big Five / HEXACO)
*   **Factors**: 主因子 + Facets (至少 6 個)。
*   **Mapping**: 提供學術可比性接口 (IPIP/NEO 映射)。

### Output D: Dynamics Layer (Context & Grip)
*   **Grip Type**: 壓力下的鏡像人格 (e.g., INTJ -> Se Grip)。
*   **Pathway**: 觸發器 -> 表現型 -> 復原路徑。
*   **Drift**: 工作/親密/長壓情境下的特質漂移量。

### Output E: Response Quality (RQS Gate)
*   **RQS**: 作答品質分數 (時間異常、直線作答、反向一致性)。
*   **Bias**: 印象管理 (IM) 與自我欺瞞 (SDE) 指標。
*   **Action**: 用於調降權重或判定無效。

---

## 3. 模組化架構設計 (Modular Architecture)

### Layer 0: Validity / RQS Gate (守門員)
*   **機制**: 反向題檢測、Long-string index、時間戳記。
*   **社會期許**: BIDR 模組。

### Layer 1: Step II Facet Engine (結構層)
*   **核心**: 對齊官方 20 Facets 定義。
*   **算法**: Facet $\theta$ + SEM (基於 IRT) -> Dimension PCI。

### Layer 2: Function Engine (功能層)
*   **擴充**: 8 功能短量表化 (每功能 6-10 題)。
*   **校準**: 結合 Grip 壓力反應進行三角驗證。

### Layer 3: Trait Engine (特質層)
*   **基底**: IPIP Big Five (快速版) 或 HEXACO (完整版)。
*   **補足**: 增加風險側寫能力。

### Layer 4: Inference Decision Layer (決策層)
*   **輸入**: Facet $\theta$, Function $\theta$, Trait $\theta$, SEM, RQS.
*   **邏輯**:
    *   若某維度 SEM 高 -> 降低權重。
    *   若矛盾點多 -> TCV 分佈平坦化。
    *   若 Grip 不符 -> 調整鄰近類型機率。

---

## 4. 報告模板框架 (Report Template)

### Section 1: Executive Summary (總覽)
*   TCV (Top 3 候選類型)。
*   四維度偏好 + 95% CI。
*   20 Facets Top 5 / Bottom 5。
*   Grip 模式與 RQS 品質警示。

### Section 2: Layered Analysis (分層詳報)
*   **Type Detail**: Step I & II 深度解析 (含 PCI)。
*   **Function Heatmap**: 8 維功能向量與一致性診斷。
*   **Trait Profile**: Big Five/HEXACO 因子對照。
*   **Context Drift**: 情境漂移分析 (Work vs. Private)。

### Section 3: Actionable Advice (行動建議)
*   **Blind Spots**: 基於功能向量的盲點提示。
*   **Resilience**: 針對 Grip 類型的復原引導。
