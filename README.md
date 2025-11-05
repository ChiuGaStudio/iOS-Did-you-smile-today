# DAILY的笑 - Did You Smile Today (iOS)

一款幫你每天「記得微笑」的小工具：

- 相機即時偵測微笑（Vision 臉部地標）
- 顯示微笑角度與曲線指標
- 手動拍攝（無自動拍攝）
- 拍後預覽：確定存入或再次拍攝（必選其一）
- 照片與紀錄本機儲存，可由日曆回顧
- 日曆顯示當日是否有紀錄
- 溫柔的每日提醒（可關閉/調時段）

## 專案結構

- `iOS_Did_you_smile_today/`
  - `iOS_Did_you_smile_todayApp.swift`：App 入口，註冊資料儲存與提醒系統
  - `ContentView.swift` -> `RootView`：分頁主畫面（相機 / 日曆 / 提醒）
  - `Theme/PixelTheme.swift`：像素風格主題（格線背景、像素按鈕、卡片與色彩）
  - `Model/SmileEntry.swift`：單筆微笑紀錄模型（時間、圖片、角度、曲線…）
  - `Services/SmileDetector.swift`：使用 Vision 偵測嘴角角度與曲線
  - `Services/CameraService.swift`：AVFoundation 相機、即時偵測
  - `Services/SmileStore.swift`：本機檔案儲存（JPEG + entries.json）
  - `Services/ReminderManager.swift`：UNUserNotificationCenter 每日提醒
  - `Views/CameraScreen.swift`：相機頁（像素風指標/手動快門/拍後預覽）
  - `Views/CalendarScreen.swift`：月曆顯示是否有紀錄（像素樣式）
  - （已移除相簿分頁）
  - `Views/SettingsScreen.swift`：提醒設定（像素樣式）

## 權限與設定

此專案已在 target 的 Build Settings 設定：

- `NSCameraUsageDescription`：App 需要使用相機來偵測你的微笑並拍照。

通知不需 Info.plist Key，但首次需要向使用者請求授權。

## 執行方式

1. 用 Xcode 開啟 `iOS_Did_you_smile_today.xcodeproj`。
2. 首次執行於真機，允許「相機」與（若開啟）「通知」。
3. 分頁：
   - 相機：即時顯示角度/曲線；拍攝後會跳出預覽供「再次拍攝 / 確定存入」。
   - 日曆：顯示當日是否有紀錄（綠色標記）。
   - 提醒：開啟/關閉每日提醒並設定時間。

## 技術細節

- 微笑計算：
  - 使用 `VNDetectFaceLandmarksRequest` 取得 `outerLips`。
  - 嘴角角度：以嘴角兩端點的斜率換算角度（度）。
  - 曲線：以上下嘴唇點相對「嘴角連線」的平均偏移估算，數值越大代表越上揚。
- 自動拍攝：
  - 連續多幀達到角度與曲線閾值（預設 ~0.2s）才觸發，避免誤判。
- 儲存：
  - 圖片以 JPEG 存於 `Documents/Smiles/`，紀錄以 `entries.json` 管理。
- 日曆：
  - 以當月天數建立網格，標示有紀錄的日期。
- 提醒：
  - `UNCalendarNotificationTrigger` 排程每日時間。
- 介面主題：
  - `PixelGridBackground` 畫出灰白格線底，`PixelButtonStyle`/`PixelCard` 提供粗線框像素風格元件。
  - 字體：目前用系統等寬字體模擬像素感。若要更像範例，請加入像素字體（如 PressStart2P 或 VT323）到專案並在 Info 的 "Fonts provided by application" 設定；檔名要與 `Font.pixel(...)` 內名稱一致。

## 注意事項 / 待優化

- 建議於真機測試（模擬器無相機）。
- 若新檔案未自動加入編譯目標，請於 Xcode 的 Target -> Build Phases -> Sources 確認檔案已有勾選。
- 微笑曲線閾值仍可依實測微調（`CameraService`）。
- 目前未寫入 Photos 相簿，所有資料皆在 App 沙盒中（方便隱私）。
- 可加上「連續天數（streak）」與更豐富的統計圖表。

## 隱私與體驗哲學

- 默認僅本機儲存，不上傳。
- 提醒設計為「可溫柔忽略」與「可調整」，避免壓力與打擾。
