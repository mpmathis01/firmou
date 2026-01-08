import React from 'react';
import { Pencil, Trash2, Camera, CheckCircle2, ChevronRight, Image as ImageIcon } from 'lucide-react';

const PhotosTab = ({ formData, updateForm, handlePhotoUpload, setFormData }) => {
    const removePhoto = (index) => {
        const newPhotos = [...formData.photos];
        newPhotos[index] = { ...newPhotos[index], file: null, preview: null, caption: '' };
        setFormData(prev => ({ ...prev, photos: newPhotos }));
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Toggle Section */}
            <div className={`group flex items-center justify-between p-4 rounded-3xl border transition-all duration-500 ${formData.showPhotos ? 'bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${formData.showPhotos ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-500'}`}>
                        <Camera size={20} />
                    </div>
                    <div>
                        <h4 className={`text-sm font-black uppercase tracking-wider ${formData.showPhotos ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                            Anexos Fotográficos
                        </h4>
                        <p className={`text-[10px] font-bold uppercase tracking-tight ${formData.showPhotos ? 'text-blue-100' : 'text-slate-400'}`}>
                            {formData.showPhotos ? 'Ativado para o PDF' : 'Desativado'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => updateForm('showPhotos', !formData.showPhotos)}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${formData.showPhotos ? 'bg-white ring-4 ring-white/10' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                    <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-500 ${formData.showPhotos ? 'left-8 bg-blue-500' : 'left-1 bg-slate-400'}`}></div>
                </button>
            </div>

            {formData.showPhotos && (
                <div className="space-y-6 animate-slide-up">
                    <div className="px-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-1">Título da Galeria</label>
                        <input
                            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 h-12 font-bold text-sm focus:border-blue-500 transition-all outline-none"
                            placeholder="Ex: Fotos do Local"
                            value={formData.photoTitle}
                            onChange={e => updateForm('photoTitle', e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        {formData.photos.map((p, i) => (
                            <div key={i} className="group flex gap-4 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl items-center hover:shadow-md transition-all">
                                {/* Photo Container with Edit/Remove Controls */}
                                <div className="relative shrink-0">
                                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all overflow-hidden shadow-inner relative group">
                                        {p.preview ? (
                                            <>
                                                <img src={p.preview} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform" />
                                                {/* Control Overlay - Light Circular Buttons at Bottom */}
                                                <div className="absolute inset-x-0 bottom-1.5 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <button
                                                        onClick={() => document.getElementById('ph' + i).click()}
                                                        className="w-7 h-7 bg-white/95 backdrop-blur-md text-slate-700 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all hover:scale-110 active:scale-90 shadow-lg border border-slate-200/50"
                                                        title="Trocar Foto"
                                                    >
                                                        <Pencil size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => removePhoto(i)}
                                                        className="w-7 h-7 bg-white/95 backdrop-blur-md text-slate-700 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-110 active:scale-90 shadow-lg border border-slate-200/50"
                                                        title="Remover Foto"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => document.getElementById('ph' + i).click()}
                                                className="w-full h-full flex flex-col items-center justify-center gap-1.5 hover:bg-white dark:hover:bg-slate-750 transition-colors"
                                            >
                                                <ImageIcon size={20} className="text-slate-300" />
                                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Slot {i + 1}</span>
                                            </button>
                                        )}
                                    </div>
                                    <input id={'ph' + i} type="file" hidden onChange={e => handlePhotoUpload(e, i)} />

                                    {/* Success Indicator */}
                                    {p.preview && (
                                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                                            <CheckCircle2 size={10} className="text-white" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <ChevronRight size={10} className="text-slate-300" />
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Descrição da Imagem</label>
                                    </div>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 h-10 font-bold text-xs outline-none focus:ring-2 ring-blue-500/20 transition-all placeholder:text-slate-300"
                                        placeholder="O que esta foto monstra?"
                                        value={p.caption}
                                        onChange={e => {
                                            const n = [...formData.photos];
                                            n[i] = { ...n[i], caption: e.target.value };
                                            setFormData(prev => ({ ...prev, photos: n }));
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotosTab;
