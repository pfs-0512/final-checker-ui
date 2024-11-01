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
  changes: [
    { field: "メールアドレス", oldValue: "old@example.com", newValue: "new@example.com" },
    { field: "対象エリア", oldValue: "東京", newValue: "全国" }
  ]
};

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const historyItem = mockHistory;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">変更履歴詳細</h1>
          <div className="text-right">
            <p className="text-gray-600 mb-1">
              {format(historyItem.timestamp, 'yyyy/MM/dd HH:mm', { locale: ja })}
            </p>
            <p className="text-gray-600">
              変更者: {historyItem.updatedBy}
            </p>
          </div>
        </div>

        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div className="space-y-4">
            {historyItem.changes.map((change, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium mb-2">{change.field}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">変更前:</p>
                    <div className="bg-red-50 p-2 rounded">
                      <p className="text-red-700">{change.oldValue || '(なし)'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">変更後:</p>
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-green-700">{change.newValue || '(なし)'}</p>
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