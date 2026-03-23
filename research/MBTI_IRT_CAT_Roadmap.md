# IRT/CAT 題庫化改造方案 (Item Response Theory & Adaptive Testing Roadmap)

> [!IMPORTANT]
> **文件性質**：系統升級路線圖 (Technical Roadmap)
> **目標**：從「規則引擎」升級為「測量引擎 (IRT)」。
> **核心**：將每一題的鑑別力 ($a$)、難度 ($b$) 與誤差 (SEM) 納入決策。

---

## 1. 建模路線選擇 (Modeling Strategy)

### A. 測量層 (Measurement Layer) - IRT (GRM)
*   **模型**: **Graded Response Model (Samejima)**。
*   **參數**:
    *   **鑑別力 ($a$)**: 該題區分高低特質者的能力 (Slope)。
    *   **閾值 ($b_1 - b_4$)**: 選擇 Likert 1-5 各選項所需的特質水平。
*   **輸出**: $\theta$ (特質分數) + SEM (標準誤) + 95% CI (信賴區間)。
*   **價值**: 識別哪些題目是「信號」，哪些是「噪音」。

### B. 決策層 (Decision Layer) - Hybrid Logic
*   **SEM Weighting**: 若某維度 SEM 過大 -> 降低該維度對類型判定的權重。
*   **Contradiction**: 若矛盾點密度高 -> TCV 分佈拉平 (不硬判單一類型)。
*   **Grip Calibration**: 若 Grip 反應與推定劣勢功能不符 -> 提升鄰近/鏡像類型機率。

---

## 2. 題庫結構規劃 (Item Bank Structure)

### 2.1 擴充目標 (Expansion Target)
為了支援 CAT 自適應，需擴充題庫以供篩選。

*   **Step II Facets**: 20 Facets x 6 題 = **120 題**。
*   **Function Scales**: 8 Functions x 8 題 = **64 題**。
*   **Trait Scales**:
    *   **Fast**: IPIP Big Five (50-100 題)。
    *   **Full**: IPIP-NEO (120+ 題，依需求)。

### 2.2 題目品質要求
*   **DIF**: 需標註題目是否對特定群體 (性別/文化) 有偏差。
*   **Unidimensionality**: 每一題應只測量單一 Facet。

---

## 3. 校準流程 (Calibration Process)

要達到「可信」，必須遵循標準校準步驟：

1.  **Data Cleaning (RQS Gate)**:
    *   剔除 RQS 低分者 (極速作答、直線作答、反向不一致)。
2.  **Unidimensionality Check**:
    *   檢查每個 Facet/Function 量表的單一向度性 (EFA/CFA)。
3.  **IRT Estimation (GRM)**:
    *   估計 $a, b$ 參數。
    *   剔除低鑑別力 ($a < 0.6$) 或擬合不佳的題目。
4.  **DIF Analysis**:
    *   檢測性別/年齡群體的題目功能差異。
5.  **Norming**:
    *   建立分層常模 (年齡/性別)。
6.  **Retest Reliability**:
    *   追蹤 2-4 週後的重測信度，建立「漂移模型」。

---

## 4. CAT 自適應測驗設計 (Adaptive Design)

### 4.1 選題邏輯 (Item Selection)
*   **Max Information**: 每一步挑選「對目前 $\theta$ 估計信息量最大」的題目。
*   **Content Balancing**: 強制分散題庫，避免集中問同一 Facet。

### 4.2 停題規則 (Stopping Rules)
*   **精度優先 (Precision)**:
    *   Dimension SEM < 0.30 (且題數 < 12)。
    *   Facet SEM < 0.40 (且題數 < 6)。
*   **上限控制 (Max Length)**: 全測驗上限 80 題 (依場景調整)。

### 4.3 輸出整合
*   每個構面回傳 $\theta, \text{SEM}, 95\% \text{CI}$。
*   若某 Facet 仍不確定 (SEM 高)，報告中標記「建議補測」。

---

## 5. 執行階段 (Execution Phases)

### Phase 1: Foundation (規則引擎優化)
*   擴充題庫至 120 題。
*   加入 RQS 與社會期許 (IM/SDE) 模組。
*   報告加入 TCV 與 SEM 概估 (Approximation)。

### Phase 2: Psychometrics (資料校準)
*   收集 N=1000+ 樣本。
*   執行 GRM 估參，刪減爛題。
*   建立初步常模。

### Phase 3: System (CAT 引擎)
*   上線 CAT 引擎，依 SEM 停題。
*   導入 Context Drift (情境漂移) 模型。
