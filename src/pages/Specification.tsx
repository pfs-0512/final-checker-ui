import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Specification = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">仕様書</h1>
        
        <ScrollArea className="h-[80vh]">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">/confirmの仕様</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>一般店マッチング条件の設定変更を確認するページ</li>
                <li>メールアドレスと対象エリアの入力フォームを提供</li>
                <li>入力値に変更があった場合、確認画面を表示</li>
                <li>確認画面では以下の情報を表示:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>変更前と変更後の選択肢の比較</li>
                    <li>追加された項目（緑背景で表示）</li>
                    <li>削除された項目（赤背景で表示）</li>
                  </ul>
                </li>
                <li>確認後、トースト通知で更新完了を表示</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">/historyの仕様</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>変更履歴の一覧を表示するページ</li>
                <li>表示項目:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>変更日時（yyyy/MM/dd HH:mm形式）</li>
                    <li>変更者名</li>
                    <li>買取店名</li>
                    <li>変更項目（カテゴリ）</li>
                  </ul>
                </li>
                <li>各履歴の詳細ボタンから個別の変更内容を確認可能</li>
                <li>新しい変更履歴が上に表示される時系列順</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">/history/:idの仕様</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>個別の変更履歴詳細を表示するページ</li>
                <li>ヘッダー部分に以下の情報を表示:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>変更日時</li>
                    <li>変更者名</li>
                    <li>買取店名</li>
                  </ul>
                </li>
                <li>各変更カテゴリごとに以下の情報を表示:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>変更前の選択肢一覧</li>
                    <li>変更後の選択肢一覧</li>
                    <li>追加された項目（緑背景で表示）</li>
                    <li>削除された項目（赤背景で表示）</li>
                  </ul>
                </li>
                <li>「一覧に戻る」ボタンで履歴一覧に戻る</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Specification;