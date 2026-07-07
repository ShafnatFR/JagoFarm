import React from 'react';
import { Sliders, AlertTriangle, CheckCircle } from 'lucide-react';
import { useJagoFarm } from '../../context/JagoFarmContext';

export default function SimulatorTab() {
  const {
    sensorDO, setSensorDO,
    sensorPH, setSensorPH,
    sensorTempWater, setSensorTempWater,
    sensorTempGreenhouse, setSensorTempGreenhouse,
    isFanOn, setIsFanOn,
    isFeederOn, setIsFeederOn,
    setSimulationAlert, addActivityLog
  } = useJagoFarm();

  const handleSimulateAlarm = (type: string) => {
    if (type === 'oxygen') {
      setSensorDO(2.8); // Dangerously low
      setSimulationAlert('BAHAYA: Kadar oksigen terlarut kolam Bioflok turun drastis di bawah 3.0 mg/L!');
      addActivityLog('Simulasi bahaya diaktifkan: Oksigen Bioflok Kritis!', 'sensor');
    } else if (type === 'temperature') {
      setSensorTempGreenhouse(39.5); // Dangerously high
      setSimulationAlert('BAHAYA: Suhu internal Smart Greenhouse melonjak melewati batas 38°C!');
      addActivityLog('Simulasi bahaya diaktifkan: Suhu Greenhouse Kritis!', 'sensor');
    } else {
      // Clear
      setSensorDO(6.4);
      setSensorTempGreenhouse(28.2);
      setSimulationAlert(null);
      addActivityLog('Sistem dibersihkan, semua indikator sensor kembali normal.', 'system');
    }
  };

  return (
    <div id="tab-content-simulator" className="space-y-6 text-left">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Sliders className="h-4 w-4 text-accent" />
          <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Simulator Telemetri Sensor Lapangan
          </h3>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          Gunakan panel ini untuk menguji kepekaan visual dashboard web Anda. Ubah slider di bawah dan lihat sensor di tab <strong>Solusi IoT (IoT Showcase)</strong> diperbarui secara instan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Water DO slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span>Oksigen Terlarut (DO) - Kolam</span>
              <span className={sensorDO < 4 ? 'text-red-500 font-black' : 'text-sky-500'}>
                {sensorDO.toFixed(1)} mg/L {sensorDO < 4 ? '(BAHAYA!)' : '(Optimal)'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={sensorDO}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSensorDO(val);
                if (val < 4) {
                  setSimulationAlert('BAHAYA: Kadar oksigen terlarut kolam Bioflok turun drastis di bawah 3.0 mg/L!');
                } else if (sensorTempGreenhouse <= 38) {
                  setSimulationAlert(null);
                }
              }}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 5.5 - 8.0 mg/L</span>
          </div>

          {/* Water pH slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span>Keasaman (pH) Air - Kolam</span>
              <span className="text-sky-500">{sensorPH.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="5"
              max="9"
              step="0.01"
              value={sensorPH}
              onChange={(e) => setSensorPH(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 6.8 - 8.2 (Ideal: 7.2)</span>
          </div>

          {/* Water Temp slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span>Suhu Air - Kolam Bioflok</span>
              <span className="text-sky-500">{sensorTempWater.toFixed(1)}°C</span>
            </div>
            <input
              type="range"
              min="15"
              max="35"
              step="0.1"
              value={sensorTempWater}
              onChange={(e) => setSensorTempWater(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 24.0°C - 29.0°C</span>
          </div>

          {/* Greenhouse Temp slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span>Suhu Udara - Greenhouse</span>
              <span className={sensorTempGreenhouse > 35 ? 'text-red-500 font-black' : 'text-emerald-500'}>
                {sensorTempGreenhouse.toFixed(1)}°C {sensorTempGreenhouse > 35 ? '(KRITIS!)' : '(Optimal)'}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="45"
              step="0.1"
              value={sensorTempGreenhouse}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSensorTempGreenhouse(val);
                if (val > 38) {
                  setSimulationAlert('BAHAYA: Suhu internal Smart Greenhouse melonjak melewati batas 38°C!');
                } else if (sensorDO >= 4) {
                  setSimulationAlert(null);
                }
              }}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Nilai aman: 24.0°C - 32.0°C</span>
          </div>

        </div>

        {/* Toggle Actuators Manual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
            <div>
              <span className="text-xs font-bold block">Status Kipas Angin (Exhaust Fan)</span>
              <span className="text-[10px] text-slate-400 font-mono">Status saat ini: {isFanOn ? 'AKTIF (Auto)' : 'MATI'}</span>
            </div>
            <button
              id="toggle-fan-simulator"
              onClick={() => {
                setIsFanOn(!isFanOn);
                addActivityLog(`Kipas Angin Greenhouse dipaksa ${!isFanOn ? 'ON' : 'OFF'} oleh admin`, 'admin');
              }}
              className={`text-[10px] font-bold font-mono px-3 py-1 rounded-full transition-all cursor-pointer ${
                isFanOn 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                  : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {isFanOn ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
            <div>
              <span className="text-xs font-bold block">Status Dispenser Pakan (AutoFeeder)</span>
              <span className="text-[10px] text-slate-400 font-mono">Status saat ini: {isFeederOn ? 'STANDBY' : 'MATI'}</span>
            </div>
            <button
              id="toggle-feeder-simulator"
              onClick={() => {
                setIsFeederOn(!isFeederOn);
                addActivityLog(`Dispenser pakan otomatis ${!isFeederOn ? 'AKTIF' : 'MATI'} oleh admin`, 'admin');
              }}
              className={`text-[10px] font-bold font-mono px-3 py-1 rounded-full transition-all cursor-pointer ${
                isFeederOn 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                  : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {isFeederOn ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Crisis simulation quick triggers */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-900 rounded-3xl p-5">
        <h4 className="font-display text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">
          Trigger Simulasi Skenario Krisis Lapangan (EWS)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            id="trigger-crisis-oxygen"
            onClick={() => handleSimulateAlarm('oxygen')}
            className="p-3.5 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 text-red-700 dark:text-red-400 transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
            <span>Simulasikan Oksigen Drop</span>
          </button>

          <button
            id="trigger-crisis-temp"
            onClick={() => handleSimulateAlarm('temperature')}
            className="p-3.5 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 text-red-700 dark:text-red-400 transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
            <span>Simulasikan Suhu Panas</span>
          </button>

          <button
            id="trigger-crisis-clear"
            onClick={() => handleSimulateAlarm('clear')}
            className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-950 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle className="h-4.5 w-4.5 shrink-0" />
            <span>Kembalikan ke Normal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
