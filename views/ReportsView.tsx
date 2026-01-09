
import React, { useState } from 'react';
import { FileText, Upload, Eye, Trash2, Calendar, FileUp, Filter } from 'lucide-react';
import { LabReport } from '../types';

const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<LabReport[]>([
    { id: '1', title: 'Blood Routine Test', date: '2023-10-01', fileUrl: '#', type: 'Hematology' },
    { id: '2', title: 'Liver Function Test', date: '2023-08-15', fileUrl: '#', type: 'Biochemistry' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newReport: LabReport = {
        id: Math.random().toString(36).substr(2, 9),
        title: file.name.split('.')[0],
        date: new Date().toISOString().split('T')[0],
        fileUrl: '#',
        type: 'General'
      };
      setReports([newReport, ...reports]);
    }
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lab Reports</h1>
          <p className="text-slate-500">Manage and view your diagnostic documents.</p>
        </div>
        
        <label className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 cursor-pointer transition-all shadow-lg shadow-blue-100">
          <Upload size={20} />
          <span>Upload Report</span>
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-blue-600 text-white p-2 rounded-xl"><FileUp size={20}/></div>
          <div>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Total Files</p>
            <p className="text-xl font-bold text-blue-900">{reports.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Recent Documents</h3>
          <button className="text-slate-400 hover:text-slate-600"><Filter size={18}/></button>
        </div>
        <div className="divide-y divide-slate-100">
          {reports.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>No reports uploaded yet.</p>
            </div>
          ) : (
            reports.map(report => (
              <div key={report.id} className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-slate-50 transition-colors group">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 truncate">{report.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Calendar size={12} /> {report.date}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">{report.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye size={20} />
                  </button>
                  <button 
                    onClick={() => deleteReport(report.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
