import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

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
          <div className="space-y-6">
            {historyItem.changes.map((change, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium text-lg mb-4">{change.category}</h3>
                <div className="space-y-4">
                  {change.details.some(detail => detail.type === "added") && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">追加:</p>
                      <div className="flex flex-wrap gap-2">
                        {change.details
                          .filter(detail => detail.type === "added")
                          .map((detail, i) => (
                            <Badge key={i} variant="default" className="bg-green-500">
                              {detail.value}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                  {change.details.some(detail => detail.type === "removed") && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">削除:</p>
                      <div className="flex flex-wrap gap-2">
                        {change.details
                          .filter(detail => detail.type === "removed")
                          .map((detail, i) => (
                            <Badge key={i} variant="default" className="bg-red-500">
                              {detail.value}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
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