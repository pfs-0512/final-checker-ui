import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ConfirmationPage from "@/components/ConfirmationPage";

const Index = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    area: "島根県、鳥取県、和歌山県、奈良県、兵庫県",
    cities: [
      "松江市", "出雲市", "浜田市", "益田市", "鳥取市", "米子市", "倉吉市", 
      "和歌山市", "田辺市", "新宮市", "奈良市", "橿原市", "神戸市", "姫路市"
    ],
    carModels: [
      "アルファード",
      "プリウス",
      "ハリアー",
      "ヴォクシー",
      "ヴェルファイア",
      "ランドクルーザープラド",
      "アクア",
      "ノア",
      "プリウスα",
      "RAV4",
      "クラウンアスリート"
    ]
  });

  const [previousData, setPreviousData] = useState({
    email: "old@example.com",
    area: "北海道、青森県、岩手県、宮城県、秋田県、茨城県、栃木県、群馬県、埼玉県、千葉県、東京都",
    cities: [
      "札幌市", "函館市", "旭川市", "青森市", "弘前市", "八戸市", "盛岡市", 
      "一関市", "仙台市", "石巻市", "秋田市", "水戸市", "つくば市", "宇都宮市",
      "前橋市", "さいたま市", "川越市", "千葉市", "船橋市", "渋谷区", "新宿区"
    ],
    carModels: [
      "セレナ",
      "エクストレイル",
      "ノート",
      "エルグランド",
      "デイズ",
      "モコ",
      "ルークス",
      "デイズルークス",
      "キューブ",
      "スカイライン"
    ]
  });

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
        oldValue: previousData.area.split("、"),
        newValue: formData.area.split("、"),
      },
      {
        field: "対象都市",
        oldValue: previousData.cities,
        newValue: formData.cities,
      },
      {
        field: "対象車種",
        oldValue: previousData.carModels,
        newValue: formData.carModels,
      }
    ].filter(change => {
      if (Array.isArray(change.oldValue) && Array.isArray(change.newValue)) {
        return JSON.stringify(change.oldValue) !== JSON.stringify(change.newValue);
      }
      return change.oldValue !== change.newValue;
    });

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
      </div>
    </div>
  );
};

export default Index;