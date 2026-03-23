# 人格分析系統：架構藍圖與權威參考文獻 (System Architecture & References)

> [!IMPORTANT]
> 本文檔確立了從「MBTI 測驗」升級為「完整人格分析系統」的技術基石。
> 原則：優先採用標準機構、官方技術手冊、同行評審期刊與原創方法論。

## 1. 高可信參考資料庫 (Annotated Bibliography)

### A. 測驗品質與心理測量學 (Psychometrics Foundation)
1.  **Standards for Educational and Psychological Testing (AERA/APA/NCME, 2014)**
    *   **系統應用**：測驗治理 (Governance) 的核心依據。用於撰寫測驗用途、信效度證據、常模建立與倫理規範。
2.  **Graded Response Model (Samejima, 1969)**
    *   **系統應用**：Likert 量表題目的 IRT 標準模型。用於估算每題的鑑別力 ($a$)、閾值 ($b$) 與量測誤差 (SEM)。
3.  **Computerized Adaptive Personality Testing (Forbey & Ben-Porath, 2007)**
    *   **系統應用**：設計 CAT 自適應選題與停題規則 (基於 SEM 控制精度)。

### B. MBTI / 榮格類型系統 (Type System)
4.  **MBTI Step II Manual Supplement (Schaubhut et al., Form Q)**
    *   **系統應用**：20 個子維度 (Facets) 的標準定義、分數解釋與心理計量證據。確保 Part I-IV 的報告語言符合官方規範。
5.  **MBTI Global Step I/II Technical Brief**
    *   **系統應用**：處理跨版本/跨語言的題目對齊。
6.  **In the Grip (Naomi Quenk)**
    *   **系統應用**：壓力動力系統的錨點。定義劣勢功能的觸發因素、表現型與復原路徑。

### C. 特質模型與學術對照 (Trait Models)
7.  **Reinterpreting the MBTI from the Perspective of the Five-Factor Model (McCrae & Costa, 1989)**
    *   **系統應用**：建立 MBTI 與 Big Five 的映射關係，確保結果具備學術可比性。
8.  **International Personality Item Pool (IPIP)**
    *   **系統應用**：提供開放題庫資源 (IPIP-NEO)，用於快速迭代題庫與 IRT 校準。
9.  **IPIP Methodology (Goldberg et al., 2006)**
    *   **系統應用**：題庫治理策略的依據。
10. **HEXACO-PI-R (Lee & Ashton)**
    *   **系統應用**：引入 H 因子 (Honesty-Humility)，用於補足除 Big Five 外的「誠信/自利」風險側寫。

### D. 反應偏誤控制 (Bias Control)
11. **Balanced Inventory of Desirable Responding (BIDR) (Paulhus)**
    *   **系統應用**：分離「印象管理 (IM)」與「自我欺瞞 (SDE)」，計算 Response Quality Score (RQS) 並進行權重校正。

---

## 2. 系統分層架構藍圖 (System Layer Architecture)

### Layer 0: 測驗品質與防作弊 (Validity / RQS Gate)
*   **Response Quality**: 作答時間、直線作答 (Long-string)、反向題一致性。
*   **Bias Control**: BIDR 模組。
*   **Output**: RQS 用於決定是否降權或重測。

### Layer 1: MBTI 結構層 (Step II Structure)
*   **Facet Engine**: 20 子維度量化分析 (清晰度 PCI + SEM)。
*   **Dimension**: 四大維度偏好強度。

### Layer 2: 認知功能層 (Jungian Functions)
*   **Continuous Strength**: 八維功能連續強度 (短量表化)。
*   **Dynamic Calibration**: 結合 Quenk 的壓力抓握理論進行校準。

### Layer 3: 特質映射層 (Trait Engine)
*   **IPIP / HEXACO**: 將結果投影至特質空間，增加學術可比性與風險預測。

### Layer 4: 動力與情境層 (Context / Inference)
*   **State vs Trait**: 區分核心人格與情境人格。
*   **Decision Layer**: 結合 Facet $\theta$、Function $\theta$、SEM 與 RQS 進行綜合推論。

### Layer 5: 自適應引擎 (Adaptation)
*   **IRT/CAT**: 使用 GRM 模型，根據 $\theta$ 值即時選題，以 SEM 作為停題標準。
