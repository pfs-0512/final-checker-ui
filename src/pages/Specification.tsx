import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Specification = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">仕様書 / Specifications</h1>
        
        <ScrollArea className="h-[80vh]">
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">/confirmの仕様 confirm Specifications</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">日本語</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>マッチング条件の変更フォーム</li>
                    <li>入力値に変更があった場合、確認画面を表示</li>
                    <li>確認画面では変更前後の選択肢を比較表示</li>
                    <li>追加された項目は緑背景、削除された項目は赤背景で表示</li>
                    <li>確認後、トースト通知で更新完了を表示</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">English</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Page for confirming changes to general store matching conditions</li>
                    <li>Displays confirmation screen when input values change</li>
                    <li>Shows comparison of before and after changes</li>
                    <li>Added items shown with green background, removed items with red background</li>
                    <li>Displays toast notification upon confirmation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">/historyの仕様 history Specifications</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">日本語</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>変更履歴の一覧を表示するページ</li>
                    <li>変更日時（yyyy/MM/dd HH:mm形式）を表示</li>
                    <li>変更者名と買取店名を表示</li>
                    <li>変更項目（カテゴリ）を表示</li>
                    <li>各履歴の詳細ボタンから個別の変更内容を確認可能</li>
                    <li>新しい変更履歴が上に表示される時系列順</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">English</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Page displaying list of change history</li>
                    <li>Shows change date/time (yyyy/MM/dd HH:mm format)</li>
                    <li>Displays modifier name and store name</li>
                    <li>Shows changed items (categories)</li>
                    <li>Individual change details can be viewed via detail button</li>
                    <li>Chronological order with newest changes at top</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">/history/:idの仕様 history/:id Specifications</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">日本語</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>個別の変更履歴詳細を表示するページ</li>
                    <li>ヘッダーに変更日時、変更者名、買取店名を表示</li>
                    <li>各変更カテゴリごとに変更前後の選択肢を表示</li>
                    <li>追加された項目は緑背景、削除された項目は赤背景で表示</li>
                    <li>「一覧に戻る」ボタンで履歴一覧に戻る</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">English</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Page showing detailed individual change history</li>
                    <li>Header displays change date/time, modifier name, and store name</li>
                    <li>Shows before and after options for each change category</li>
                    <li>Added items shown with green background, removed items with red background</li>
                    <li>Return to list view via "Back to List" button</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Specification;
