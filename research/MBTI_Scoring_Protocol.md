# MBTI 評量計分與分析協議 v2.0 (Scoring & Analysis Protocol)

> [!IMPORTANT]
> **版本 v2.0 更新 (High-Precision Model)**
> 本協議已升級為「機率模型」，不再僅輸出單一類型。
> 新增核心：**Type Confidence Vector (TCV)** 與 **Continuous Function Strength (CFS)**。

## 1. 核心計分演算法 (Core Algorithm)

### A. 原始分數矩陣 (Raw Score Matrix)
*   **Likert Scale**: 5分制轉換為 {-2, -1, 0, +1, +2}。
*   **Facet Weighting**: 每個主維度 (如 E/I) 由 5 個子維度分數加權平均。
    *   $Score_{dim} = \sum_{i=1}^{5} (Facet_i \times Weight_i)$
    *   *(預設權重相等，除非特定 Facet 清晰度極低)*

### B. 類型信心向量 (Type Confidence Vector, TCV)
我們不再說 "你是 INTJ"，而是計算你屬於各類型的「機率」。
使用 Softmax-like 函數處理 16 型的原始匹配分：

$$ P(Type_i) = \frac{e^{Score_i / T}}{\sum_{j=1}^{16} e^{Score_j / T}} $$

*   *T (Temperature)*: 用於調節分布的平滑度，預設 1.0。
*   **輸出範例**：
    *   **INTJ**: 0.72 (主要類型)
    *   **INFJ**: 0.15 (次要可能性，顯示 Ni-dom 的共性)
    *   **ENTJ**: 0.08 (顯示 Te 的強勢)
    *   *Others*: 0.05

---

## 2. 連續認知功能強度 (Continuous Cognitive Function Strength)

我們不僅排序功能 (Ni > Te...)，還計算其 **連續強度 (0.00 - 1.00)**。

### 計算公式
$$ Strength(Func) = Base(Jung) + Modifier(Facet) + Context(Grip) $$

1.  **Base (Jung)**: 來自 Part V 的二選一結果 (0.0 或 1.0)。
2.  **Modifier (Facet)**: 來自 Part I-IV 的量表分數 (常態化至 -0.2 ~ +0.2)。
3.  **Context (Grip)**: 來自 Part VI。若出現 Grip (如 Se Grip)，會顯著提升劣勢功能 (Se) 的「消極活躍度」，並略微降低主導功能 (Ni) 的「穩定度」。

### 輸出範例 (INTJ 案例)
*   **Ni (Introverted Intuition)**: **0.92** (高度分化，核心驅動)
*   **Te (Extraverted Thinking)**: **0.78** (強效工具)
*   **Fi (Introverted Feeling)**: **0.45** (中等，個人價值觀明確但私密)
*   **Se (Extraverted Sensing)**: **0.35** (低，但在壓力下會飆升至 0.80 並呈現負面特質)

---

## 3. 情境漂移參數 (Contextual Drift - Level 3)

人格不是靜態的。本模型引入 **$\Delta Context$** 參數：
*   **Work Mode**: Te/Fe 權重 +15%。
*   **Stress Mode**: 劣勢功能 (Inferior) 活躍度 +40%，主導功能 (Dominant) 穩定度 -30%。

---

## 4. 分析報告輸出標準 v2.0 (Report Standards)

最終報告將包含：
1.  **Type Confidence Vector**: 前三名機率分布圖。
2.  **Cognitive Function Heatmap**: 8 維功能強度熱力圖。
3.  **Drift Analysis**: "常態 vs 壓力態" 的人格變形分析。
4.  **Blind Spot Alert**: 基於 TCV 中第二可能性的「誤判風險提示」（例如：為什麼你可能覺得自己像 INFJ？）。

> [!NOTE]
> 此模型已具備處理「邊界型人格」(Borderline Types) 與「類型漂移」(Type Drift) 的數學能力。
