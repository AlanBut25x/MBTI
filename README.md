# MBTI Assessment System v2.0

基於心理計量學與項目反應理論 (IRT) 的高階人格分析系統。採用 **Editorial Luxury (社論式奢華)** 視覺語彙，提供深度的人格動態分析報告。

## 🎨 核心特色
- **頂級視覺設計**: 使用 Playfair Display 搭配極簡排版，營造專業且具權威感的體驗。
- **雙模式測試**: 提供快速掃描 (Rapid Scan) 與 深度剖析 (Full Scale) 兩種版本。
- **動態分析**: TCV 信心向量計算與 Ni-Fi Loop 等認知動力學檢測。
- **研究文檔**: 完整收錄 IRT 實作細節與 PRD 規格。

## 📖 交接與開發指南
如果您是接手的 UI/UX 開發人員，請務必先閱讀根目錄下的 **[UI_HANDOVER_GUIDE.md](./UI_HANDOVER_GUIDE.md)**。

## 🛠️ 開發技術與架構 (Built With)
本系統採用現代化前端架構打造：
- **框架 (Framework)**: [React v18+](https://react.dev/) + [Vite](https://vitejs.dev/)
- **動效 (Animations)**: [Framer Motion](https://www.framer.com/motion/)
- **視覺規範 (Design)**: 極簡 Editorial Luxury 規範，採用純 CSS 實作全域 Token。

## 🧠 學術根據與算法 (Scientific Basis)
本專案的核心邏輯建立在以下專業領域之上：
- **項目反應理論 (IRT)**: 精確計算題目區分度。
- **Step II Facets**: 提供比傳統 MBTI 更細緻的面向分析。
- **TCV (Type Confidence Vector)**: 自研空間向量算法，衡量類型準確度。
- **Jungian Dynamics**: 深度偵測 Ni-Fi Loop 與 Grip 壓力狀態。

## 🚀 快速啟動
1. 安裝依賴:
   ```bash
   npm install
   ```
2. 啟動開發伺服器:
   ```bash
   npm run dev -- --port 5175
   ```

## 📂 專案結構
- `/src`: 前端代碼與 UI 組件。
- `/research`: 心理計量學研究與技術文檔。
- `/data`: 核心題庫資料。

---
*Developed by Cognitive Labs*
