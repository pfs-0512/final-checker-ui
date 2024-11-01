import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface HistoryItem {
  id: string;
  timestamp: Date;
  updatedBy: string;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    timestamp: new Date("2024-02-20T10:00:00"),
    updatedBy: "山田太郎",
    changes: [
      { field: "メールアドレス", oldValue: "old@example.com", newValue: "new@example.com" },
      { field: "対象エリア", oldValue: "東京", newValue: "全国" }
    ]
  },
  {
    id: "2",
    timestamp: new Date("2024-02-19T15:30:00"),
    updatedBy: "鈴木花子",
    changes: [
      { field: "対象エリア", oldValue: "大阪", newValue: "東京" }
    ]
  }
];

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">変更履歴一覧</h1>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日時</TableHead>
              <TableHead>変更者</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((item) => (
              <TableRow key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/history/${item.id}`)}>
                <TableCell>
                  {format(item.timestamp, 'yyyy/MM/dd HH:mm', { locale: ja })}
                </TableCell>
                <TableCell>{item.updatedBy}</TableCell>
                <TableCell>
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/history/${item.id}`);
                    }}
                  >
                    詳細を見る
                  </button>
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