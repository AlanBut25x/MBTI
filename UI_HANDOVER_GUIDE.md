# MBTI 專案 UI 開發交接指南 (UI Handover Guide)

本文件旨在協助後續 UI/UX 開發人員快速理解本專案的架構、設計語彙及核心邏輯。

## 🚀 專案啟動 (Getting Started)

1.  **環境**: Node.js (建議 v18+)
2.  **安裝依賴**: `npm install`
3.  **啟動開發伺服器**: `npm run dev -- --port 5175`
4.  **構建正式產線包**: `npm run build`

## 🎨 設計系統 (Design System: Editorial Luxury)

本專案目前的視覺定位為 **「Editorial Luxury (社論式奢華)」**。

*   **核心字體**:
    *   `Playfair Display`: 用於大標題、強調語句、義大利體選取。營造學術權威感與精品氛圍。
    *   `Inter`: 用於內文、按鈕、細節說明。保持高度可讀性。
*   **配色方案**:
    *   背景: `#ffffff` (純白) / `#fafaf9` (細緻象牙白)
    *   文字: `#1c1917` (深板岩色)
    *   強調: `#1e3a8a` (海軍藍) / `#92400e` (焦糖棕)
*   **關鍵屬性**: 大間距 (Negative Space)、捲動揭露動畫 (Scroll-Reveal)、極簡線條。

## 🧠 核心邏輯與學術根據 (Core Logic & Theory)

本系統的核心價值在於其嚴謹的學術背景：
1.  **學術來源**: 符合 **Standards 2014** (AERA/APA) 規範。
2.  **理論基礎**: 結合**榮格心理類型學**與 **Myers-Briggs** 指標。
3.  **核心技術**:
    *   **IRT (項目反應理論)**: 用於動態調整題目表現評估。
    *   **TCV (Type Confidence Vector)**: 將 16 型人格投影至歐幾里得空間，計算受測者的「重心向量」。
    *   **認知動力學**: 專門偵測功能跳躍 (Loops) 與陰影介入 (Grip)。

## 🛠️ 開發技術棧 (Technical Stack)

*   **前端**: React + Vite (高效能開發與構建)。
*   **動畫**: Framer Motion (處理高品質社論揭露動效)。
*   **樣式**: 原生 CSS 變量 (定義於 `index.css`)。
*   **組件庫**: Lucide React (精緻的線性圖標)。

## 📂 資料夾結構 (Project Structure)

```
MBTI_App/
├── research/           # 核心研究文檔 (IRT 技術、INTJ 分析、PRD)
├── src/
│   ├── assets/        # 靜態資源
│   ├── components/    # 共享組件 (如 QuestionCard)
│   ├── data/          # 題庫資料 (questions.json)
│   ├── pages/         # 頁面級組件 (Home, Assessment, Result)
│   ├── SimpleApp.jsx  # 【重要】高保真 UI 參考實作 (單一檔案，適合快速調整 UI)
│   ├── index.css      # 全域樣式指標 (Design Tokens 定義於此)
│   └── App.jsx        # 路由定義
```

## 💎 UI 快速開發建議 (UI Prototyping)

如果您希望在不影響核心邏輯的情況下快速嘗試新的 UI 設計，請參考 **`src/SimpleApp.jsx`**。
*   這是用戶提供的**標準視覺規範實作**。
*   它將所有的邏輯、樣式與結構整合在單一檔案內。
*   非常適合設計師用來調整 `COLORS` 常量與動畫參數。

## 🧠 核心邏輯 (Core Logic)

1.  **題庫系統**: 檔案位於 `src/data/questions.json`。目前支援 `likert` (五階量表) 與一般選擇。
2.  **評分機制**: 目前實作於 `Result.jsx`。
    *   **TCV (Type Confidence Vector)**: 用於計算受測者在 16 型空間中的機率分佈。
    *   **Loop 檢測**: 針對 Ni-Fi 等認知功能跳躍進行偵測。
3.  **模式切換**:
    *   `Rapid Scan`: 快速模式，僅篩選核心維度與 Grip 壓力測試。
    *   `Full Scale`: 完整深度剖析。

## 🛠️ 給 UI 開發者的建議

1.  **樣式調整**: 大部分的設計變量都定義在 `src/index.css` 的 `:root` 中。
2.  **動畫**: 本專案使用 `framer-motion` 處理過場。大部分頁面組件都包裝在 `AnimatePresence` 或 `Reveal` 組件中。
3.  **擴充題庫**: 若要增加題目，請依循 `questions.json` 的 schema，系統會自動在 `Assessment.jsx` 中載入。

---
*整理日期: 2026-02-03*
