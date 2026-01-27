
import React, { useState } from 'react';
import { LabReport } from '../../types';
import { Upload, FileText, Download, Eye, Calendar, Plus, Trash2 } from 'lucide-react';

const LabReports: React.FC = () => {
  const [reports, setReports] = useState<LabReport[]>([
    { id: 'r1', name: 'Blood Test - CBC', date: '2023-10-15', url: '#' },
    { id: 'r2', name: 'Lipid Profile', date: '2023-09-22', url: '#' },
    { id: 'r3', name: 'Thyroid T3 T4 TSH', date: '2023-08-05', url: '#' }
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload
      setTimeout(() => {
        const newReport: LabReport = {
          id: `r${Date.now()}`,
          name: file.name,
          date: new Date().toISOString().split('T')[0],
          url: '#'
        };
        setReports([newReport, ...reports]);
        setIsUploading(false);
      }, 1500);
    }
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Updated Lab Reports</h3>
          <p className="text-sm text-slate-500">Securely store and access your medical documents.</p>
        </div>
        
        <label className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-teal-100 transition-all">
          <Plus size={20} />
          {isUploading ? 'Uploading...' : 'Upload New Report'}
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.png" disabled={isUploading} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map(report => (
          <div key={report.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm group hover:border-teal-300 transition-all">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FileText size={28} />
              </div>
              <button 
                onClick={() => deleteReport(report.id)}
                className="text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <h4 className="font-bold text-slate-800 mb-2 truncate" title={report.name}>
              {report.name}
            </h4>
            
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
              <Calendar size={14} />
              Uploaded on {new Date(report.date).toLocaleDateString()}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors">
                <Eye size={16} /> View
              </button>
              <button className="flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors">
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="col-span-full py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
              <Upload size={40} />
            </div>
            <p className="text-slate-400">No medical reports found. Upload your first document!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabReports;
