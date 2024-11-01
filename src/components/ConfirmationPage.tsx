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
          <div className="space-y-4">
            {changes.map((change, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium mb-2">{change.field}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">変更前:</p>
                    <div className="bg-red-50 p-2 rounded">
                      {Array.isArray(change.oldValue) ? (
                        <ul className="list-disc list-inside">
                          {change.oldValue.map((item, i) => (
                            <li key={i} className="text-red-700">{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-red-700">{change.oldValue || '(なし)'}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">変更後:</p>
                    <div className="bg-green-50 p-2 rounded">
                      {Array.isArray(change.newValue) ? (
                        <ul className="list-disc list-inside">
                          {change.newValue.map((item, i) => (
                            <li key={i} className="text-green-700">{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-green-700">{change.newValue || '(なし)'}</p>
                      )}
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