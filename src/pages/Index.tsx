import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ConfirmationPage from "@/components/ConfirmationPage";

const Index = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData] = useState({
    email: "",
    area: "全国",
  });

  const [previousData] = useState({
    email: "old@example.com",
    area: "東京",
  });

  const [changes] = useState([
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
  ]);

  const handleConfirm = () => {
    setShowConfirmation(false);
    toast({
      title: "確認",
      description: "これはモックです。実際の変更は行われません。",
    });
  };

  if (showConfirmation) {
    return (
      <ConfirmationPage
        changes={changes}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
      />
    );
  }

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
              readOnly
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">対象エリア</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              readOnly
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>

          <div className="mt-6">
            <Button 
              onClick={() => setShowConfirmation(true)}
              className="w-full"
            >
              変更する
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;