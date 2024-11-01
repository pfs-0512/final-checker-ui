import { useEffect, useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    area: "全国",
  });

  // 前回の値を保存
  const [previousData, setPreviousData] = useState({
    email: "old@example.com",
    area: "東京",
  });

  const [changes, setChanges] = useState([]);

  // フォームデータが変更されるたびに変更内容を確認
  useEffect(() => {
    const changesArray = [
      {
        field: "メールアドレス",
        oldValue: previousData.email,
        newValue: formData.email,
      },
      {
        field: "対象エリア",
        oldValue: previousData.area,
        newValue: formData.area,
      },
    ].filter(change => change.oldValue !== change.newValue);

    if (changesArray.length > 0) {
      setChanges(changesArray);
      setShowConfirmation(true);
    }
  }, [formData, previousData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirm = async () => {
    try {
      // 確定時の処理
      setPreviousData(formData);
      toast({
        title: "更新完了",
        description: "設定が正常に更新されました。",
      });
      setShowConfirmation(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラー",
        description: "更新中にエラーが発生しました。",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">一般店マッチング条件</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">メールアドレス</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">対象エリア</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <ConfirmationDialog
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirm}
          changes={changes}
        />
      </div>
    </div>
  );
};

export default Index;