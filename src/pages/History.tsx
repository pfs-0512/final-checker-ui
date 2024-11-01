import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
  },
  {
    id: "3",
    timestamp: new Date("2024-02-18T09:15:00"),
    updatedBy: "佐藤一郎",
    changes: [
      { field: "メールアドレス", oldValue: "sato@example.com", newValue: "sato.new@example.com" }
    ]
  },
  {
    id: "4",
    timestamp: new Date("2024-02-17T14:20:00"),
    updatedBy: "田中美咲",
    changes: [
      { field: "対象エリア", oldValue: "九州", newValue: "福岡" }
    ]
  },
  {
    id: "5",
    timestamp: new Date("2024-02-16T11:45:00"),
    updatedBy: "山田太郎",
    changes: [
      { field: "メールアドレス", oldValue: "info@example.com", newValue: "contact@example.com" },
      { field: "対象エリア", oldValue: "関東", newValue: "東京" }
    ]
  },
  {
    id: "6",
    timestamp: new Date("2024-02-15T16:30:00"),
    updatedBy: "鈴木花子",
    changes: [
      { field: "対象エリア", oldValue: "北海道", newValue: "札幌" }
    ]
  },
  {
    id: "7",
    timestamp: new Date("2024-02-14T13:10:00"),
    updatedBy: "高橋健一",
    changes: [
      { field: "メールアドレス", oldValue: "takahashi@example.com", newValue: "ken1@example.com" }
    ]
  },
  {
    id: "8",
    timestamp: new Date("2024-02-13T10:25:00"),
    updatedBy: "渡辺直子",
    changes: [
      { field: "対象エリア", oldValue: "中部", newValue: "愛知" },
      { field: "メールアドレス", oldValue: "naoko@example.com", newValue: "watanabe@example.com" }
    ]
  },
  {
    id: "9",
    timestamp: new Date("2024-02-12T17:40:00"),
    updatedBy: "伊藤裕子",
    changes: [
      { field: "対象エリア", oldValue: "関西", newValue: "大阪" }
    ]
  },
  {
    id: "10",
    timestamp: new Date("2024-02-11T08:55:00"),
    updatedBy: "小林誠",
    changes: [
      { field: "メールアドレス", oldValue: "kobayashi@example.com", newValue: "makoto@example.com" },
      { field: "対象エリア", oldValue: "四国", newValue: "香川" }
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/history/${item.id}`);
                    }}
                  >
                    詳細を見る
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