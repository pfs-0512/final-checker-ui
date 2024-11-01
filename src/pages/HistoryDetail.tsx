import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

const mockHistory = {
  id: "1",
  timestamp: new Date("2024-02-20T10:00:00"),
  updatedBy: "山田太郎",
  shopName: "カーショップA",
  changes: [
    {
      category: "エリア",
      details: [
        { type: "added", value: "東京都" },
        { type: "removed", value: "神奈川県" }
      ]
    },
    {
      category: "メーカー",
      details: [
        { type: "added", value: "トヨタ" },
        { type: "added", value: "ホンダ" }
      ]
    }
  ]
};

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const historyItem = mockHistory;

  const getBeforeAfterValues = (change: typeof mockHistory.changes[0]) => {
    const beforeValues = change.details
      .filter(detail => detail.type === "removed")
      .map(detail => detail.value);
    const afterValues = change.details
      .filter(detail => detail.type === "added")
      .map(detail => detail.value);
    
    return {
      before: beforeValues.length > 0 ? beforeValues.join(", ") : "(なし)",
      after: afterValues.length > 0 ? afterValues.join(", ") : "(なし)"
    };
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
          <div className="space-y-4">
            {historyItem.changes.map((change, index) => {
              const { before, after } = getBeforeAfterValues(change);
              return (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-medium mb-2">{change.category}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">変更前:</p>
                      <div className="bg-red-50 p-2 rounded">
                        <p className="text-red-700">{before}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">変更後:</p>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-green-700">{after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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