import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

const mockHistory = {
  "1": {
    id: "1",
    timestamp: new Date("2024-02-20T10:00:00"),
    updatedBy: "山田太郎",
    shopName: "カーショップA",
    changes: [
      {
        category: "エリア",
        details: [
          { type: "added", value: "東京都" },
          { type: "added", value: "千葉県" },
          { type: "added", value: "埼玉県" },
          { type: "removed", value: "神奈川県" },
          { type: "removed", value: "静岡県" }
        ],
        before: ["神奈川県", "静岡県"],
        after: ["東京都", "千葉県", "埼玉県"]
      },
      {
        category: "メーカー",
        details: [
          { type: "added", value: "トヨタ" },
          { type: "added", value: "ホンダ" },
          { type: "added", value: "日産" },
          { type: "removed", value: "スバル" }
        ],
        before: ["スバル"],
        after: ["トヨタ", "ホンダ", "日産"]
      },
      {
        category: "車種",
        details: [
          { type: "added", value: "プリウス" },
          { type: "added", value: "アクア" },
          { type: "removed", value: "ヴィッツ" },
          { type: "removed", value: "フィット" }
        ],
        before: ["ヴィッツ", "フィット"],
        after: ["プリウス", "アクア"]
      },
      {
        category: "ボディタイプ",
        details: [
          { type: "added", value: "セダン" },
          { type: "added", value: "SUV" },
          { type: "removed", value: "軽自動車" }
        ],
        before: ["軽自動車"],
        after: ["セダン", "SUV"]
      }
    ]
  },
  "2": {
    id: "2",
    timestamp: new Date("2024-02-19T15:30:00"),
    updatedBy: "鈴木花子",
    shopName: "カーショップB",
    changes: [
      {
        category: "車種",
        details: [
          { type: "added", value: "プリウス" },
          { type: "removed", value: "アクア" }
        ],
        before: ["アクア"],
        after: ["プリウス"]
      }
    ]
  }
};

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const historyItem = mockHistory[id as keyof typeof mockHistory];

  // Add error handling for when history item is not found
  if (!historyItem) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">変更履歴詳細</h1>
          <p className="text-gray-600 mb-6">指定された履歴が見つかりませんでした。</p>
          <Button variant="outline" onClick={() => navigate("/history")}>
            一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  const getChanges = (change: typeof mockHistory["1"]["changes"][0], type: "added" | "removed") => {
    const values = change.details
      .filter(detail => detail.type === type)
      .map(detail => detail.value);
    return values.length > 0 ? values.join("、") : "(なし)";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">変更履歴詳細</h1>
            <p className="text-gray-600 mt-2">
              {format(historyItem.timestamp, 'yyyy/MM/dd HH:mm', { locale: ja })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 mb-1">
              変更者: {historyItem.updatedBy}
            </p>
            <p className="text-gray-600">
              買取店名: {historyItem.shopName}
            </p>
          </div>
        </div>

        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div className="space-y-8">
            {historyItem.changes.map((change, index) => (
              <div key={index} className="border-b pb-8">
                <h3 className="font-medium text-lg mb-6">{change.category}</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">変更前の選択肢:</p>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          {change.before.length > 0 ? change.before.join("、") : "(なし)"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">変更後の選択肢:</p>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          {change.after.length > 0 ? change.after.join("、") : "(なし)"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">追加された項目:</p>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-green-700">{getChanges(change, "added")}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">削除された項目:</p>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-red-700">{getChanges(change, "removed")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-6">
          <Button variant="outline" onClick={() => navigate("/history")}>
            一覧に戻る
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;