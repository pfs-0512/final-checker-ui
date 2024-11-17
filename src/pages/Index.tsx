import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import ConfirmationPage from "@/components/ConfirmationPage";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  area: z.string().min(1, "対象エリアを入力してください"),
});

const Index = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    area: "全国",
  });

  const [previousData, setPreviousData] = useState({
    email: "old@example.com",
    area: "東京",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    area?: string;
  }>({});

  const [changes, setChanges] = useState([]);

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
    }
  }, [formData, previousData]);

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && changes.length > 0) {
      setShowConfirmation(true);
    } else if (changes.length === 0) {
      toast({
        title: "変更なし",
        description: "変更された項目がありません。",
      });
    }
  };

  const handleConfirm = async () => {
    try {
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="area">対象エリア</Label>
            <Input
              id="area"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className={errors.area ? "border-red-500" : ""}
            />
            {errors.area && (
              <p className="text-sm text-red-500">{errors.area}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            変更を確認する
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;