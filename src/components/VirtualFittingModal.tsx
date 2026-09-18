import React, { useState } from 'react';
import { X, SlidersHorizontal, Check, Ruler } from 'lucide-react';
import { ProductSize } from '../types';

interface VirtualFittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySize: (size: ProductSize) => void;
}

export const VirtualFittingModal: React.FC<VirtualFittingModalProps> = ({
  isOpen,
  onClose,
  onApplySize
}) => {
  if (!isOpen) return null;

  const [gender, setGender] = useState<'fem' | 'masc'>('fem');
  const [height, setHeight] = useState<number>(168);
  const [weight, setWeight] = useState<number>(63);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'regular' | 'loose'>('regular');

  // Recommendation logic
  const calculateSize = (): ProductSize => {
    let bmi = weight / Math.pow(height / 100, 2);
    if (fitPreference === 'fitted') bmi -= 1.2;
    if (fitPreference === 'loose') bmi += 1.5;

    if (gender === 'fem') {
      if (bmi < 19.5) return 'PP';
      if (bmi < 22.5) return 'P';
      if (bmi < 25.5) return 'M';
      if (bmi < 28.5) return 'G';
      return 'GG';
    } else {
      if (bmi < 21) return 'P';
      if (bmi < 24.5) return 'M';
      if (bmi < 28) return 'G';
      return 'GG';
    }
  };

  const recommendedSize = calculateSize();

  const handleApply = () => {
    onApplySize(recommendedSize);
    onClose();
  };

  const tableData = [
    { size: 'PP', bust: '82 - 86 cm', waist: '64 - 68 cm', hip: '90 - 94 cm' },
    { size: 'P', bust: '86 - 90 cm', waist: '68 - 72 cm', hip: '94 - 98 cm' },
    { size: 'M', bust: '90 - 96 cm', waist: '72 - 78 cm', hip: '98 - 104 cm' },
    { size: 'G', bust: '96 - 104 cm', waist: '78 - 86 cm', hip: '104 - 112 cm' },
    { size: 'GG', bust: '104 - 112 cm', waist: '86 - 94 cm', hip: '112 - 120 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DFD6CA] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8E0D2] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#9A5C32]" />
            <h2 className="font-serif text-2xl font-medium text-[#1E1B18]">
              Provador Virtual Interativo
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#635C52] hover:text-black hover:bg-[#EFE8DE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Gender Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#423A31] mb-2">
              Modelagem de Referência:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('fem')}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  gender === 'fem' ? 'bg-[#231F1C] text-white' : 'bg-[#EFEAE2] text-[#423A31]'
                }`}
              >
                Feminina
              </button>
              <button
                type="button"
                onClick={() => setGender('masc')}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  gender === 'masc' ? 'bg-[#231F1C] text-white' : 'bg-[#EFEAE2] text-[#423A31]'
                }`}
              >
                Masculina
              </button>
            </div>
          </div>

          {/* Sliders: Height and Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-[#423A31]">
                <span>Sua Altura</span>
                <span className="font-bold text-[#1E1B18]">{height} cm</span>
              </div>
              <input
                type="range"
                min="145"
                max="205"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-[#231F1C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#857C70]">
                <span>1,45m</span>
                <span>2,05m</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-[#423A31]">
                <span>Seu Peso</span>
                <span className="font-bold text-[#1E1B18]">{weight} kg</span>
              </div>
              <input
                type="range"
                min="40"
                max="125"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#231F1C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#857C70]">
                <span>40kg</span>
                <span>125kg</span>
              </div>
            </div>
          </div>

          {/* Fit preference */}
          <div>
            <label className="block text-xs font-semibold text-[#423A31] mb-2">
              Como você prefere o caimento da roupa?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'fitted', label: 'Mais Justo' },
                { id: 'regular', label: 'Caimento Padrão' },
                { id: 'loose', label: 'Mais Soltinho' },
              ].map((fit) => (
                <button
                  key={fit.id}
                  type="button"
                  onClick={() => setFitPreference(fit.id as any)}
                  className={`py-2 px-1 text-center text-xs rounded-lg transition-colors cursor-pointer font-medium ${
                    fitPreference === fit.id
                      ? 'bg-[#524436] text-white'
                      : 'bg-[#F0EBE3] text-[#524436] hover:bg-[#E5DFD4]'
                  }`}
                >
                  {fit.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="p-4 bg-[#F2F7F2] rounded-xl border border-[#BDE0C3] flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#2B6A3B] font-bold">
                Tamanho Sugerido
              </span>
              <p className="text-xs text-[#416B4A] mt-0.5">
                92% das pessoas com suas medidas vestem:
              </p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 bg-[#2E6A3B] text-white text-2xl font-bold rounded-xl shadow-xs">
                {recommendedSize}
              </span>
            </div>
          </div>

          {/* Measurements table */}
          <div>
            <p className="text-xs font-semibold text-[#423A31] mb-2 flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5" />
              Tabela de Medidas Corporais (em centímetros):
            </p>
            <div className="overflow-x-auto border border-[#E8E1D5] rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF7F2] text-[#696156] border-b border-[#E8E1D5]">
                  <tr>
                    <th className="p-2">Tam</th>
                    <th className="p-2">Busto/Tórax</th>
                    <th className="p-2">Cintura</th>
                    <th className="p-2">Quadril</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D7]">
                  {tableData.map((row) => (
                    <tr
                      key={row.size}
                      className={row.size === recommendedSize ? 'bg-[#EBF5ED] font-semibold text-[#235830]' : 'text-[#474138]'}
                    >
                      <td className="p-2">{row.size}</td>
                      <td className="p-2">{row.bust}</td>
                      <td className="p-2">{row.waist}</td>
                      <td className="p-2">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-3.5 bg-[#231F1C] hover:bg-[#3D3732] text-white text-xs sm:text-sm font-medium rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Filtrar Loja pelo Tamanho {recommendedSize}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
