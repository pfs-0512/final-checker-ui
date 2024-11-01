import { useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    area: "全国",
    // ... other form fields
  });

  // Track changes for confirmation dialog
  const [changes, setChanges] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compare current form data with previous data to generate changes
    const changesArray = [
      {
        field: "メールアドレス",
        oldValue: "old@example.com",
        newValue: formData.email,
      },
      {
        field: "対象エリア",
        oldValue: "東京",
        newValue: formData.area,
      },
      // Add other fields as needed
    ];
    
    setChanges(changesArray);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      // Implement your save logic here
      
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
        
        <form onSubmit={handleSubmit}>
          {/* Your existing form fields here */}
          
          <div className="mt-6">
            <Button type="submit">
              更新する
            </Button>
          </div>
        </form>

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
