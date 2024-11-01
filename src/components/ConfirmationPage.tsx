import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DiffItem {
  field: string;
  oldValue: string | string[];
  newValue: string | string[];
}

interface ConfirmationPageProps {
  onClose: () => void;
  onConfirm: () => void;
  changes: DiffItem[];
}

const ConfirmationPage = ({ onClose, onConfirm, changes }: ConfirmationPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">変更内容の確認</h2>
        
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div className="space-y-8">
            {changes.map((change, index) => (
              <div key={index} className="border-b pb-8">
                <h3 className="font-medium text-lg mb-6">{change.field}</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">変更前の選択肢:</p>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          {Array.isArray(change.oldValue) 
                            ? change.oldValue.join("、") || "(なし)"
                            : change.oldValue || "(なし)"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">変更後の選択肢:</p>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          {Array.isArray(change.newValue)
                            ? change.newValue.join("、") || "(なし)"
                            : change.newValue || "(なし)"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">追加された項目:</p>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-green-700">
                        {Array.isArray(change.newValue) && Array.isArray(change.oldValue)
                          ? change.newValue.filter(item => !change.oldValue.includes(item)).join("、") || "(なし)"
                          : change.newValue || "(なし)"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">削除された項目:</p>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-red-700">
                        {Array.isArray(change.oldValue) && Array.isArray(change.newValue)
                          ? change.oldValue.filter(item => !change.newValue.includes(item)).join("、") || "(なし)"
                          : change.oldValue || "(なし)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={onConfirm}>
            変更を確定する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;