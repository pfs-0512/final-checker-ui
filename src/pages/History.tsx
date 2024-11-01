import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface ChangeDetail {
  type: 'added' | 'removed';
  value: string;
}

interface Change {
  category: string;
  details: ChangeDetail[];
}

interface HistoryItem {
  id: string;
  timestamp: Date;
  updatedBy: string;
  shopName: string;
  changes: Change[];
}

const mockHistory: HistoryItem[] = [
  {
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
  },
  {
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
        ]
      }
    ]
  }
];

const History = () => {
  const navigate = useNavigate();

  const getCategorySummary = (changes: Change[]) => {
    return changes.map(change => change.category).join(", ");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">変更履歴一覧</h1>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>変更日時</TableHead>
              <TableHead>変更者</TableHead>
              <TableHead>買取店名</TableHead>
              <TableHead>変更項目</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {format(item.timestamp, 'yyyy/MM/dd HH:mm', { locale: ja })}
                </TableCell>
                <TableCell>{item.updatedBy}</TableCell>
                <TableCell>{item.shopName}</TableCell>
                <TableCell>{getCategorySummary(item.changes)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/history/${item.id}`)}
                  >
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default History;