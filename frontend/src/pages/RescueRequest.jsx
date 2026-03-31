import React, { useState } from "react";
import {
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Phone,
  User,
  Info,
} from "lucide-react";

const RescueRequest = () => {
  const [formData, setFormData] = useState({
    manualLocation: "",
    gpsLocation: "",
    gpsUrl: "",
    condition: "",
    reporterName: "",
    reporterPhone: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [gpsStatus, setGpsStatus] = useState("idle");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Your browser does not support GPS. / तुमच्या ब्राउझरमध्ये GPS सपोर्ट नाही.",
      );
      return;
    }

    setGpsStatus("fetching");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

        setFormData((prev) => ({
          ...prev,
          gpsLocation: `GPS Pin: ${mapLink}`,
          gpsUrl: mapLink,
        }));
        setGpsStatus("success");
      },
      (error) => {
        setGpsStatus("error");
        alert("Unable to fetch location. / स्थान मिळवण्यात अक्षम.");
      },
    );
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/rescue/add", {
        method: "POST",
        body: data,
      });

      const resJson = await response.json();
      if (resJson.success) {
        alert("Rescue request sent! / बचाव विनंती पाठवली गेली!");
        setFormData({
          manualLocation: "",
          gpsLocation: "",
          gpsUrl: "",
          condition: "",
          reporterName: "",
          reporterPhone: "",
          photo: null,
        });
        setGpsStatus("idle");
      }
    } catch (err) {
      alert("Error sending request. / विनंती पाठवताना त्रुटी आली.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Soft Blur Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white dark:border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="bg-rose-600 p-8 text-center text-white">
            <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 animate-pulse">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              Emergency Rescue
            </h1>
            <p className="text-rose-100 font-bold text-xl italic underline decoration-rose-300 underline-offset-4">
              तात्काळ बचाव विनंती
            </p>
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Location Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="text-rose-600" /> Location Details /
                  स्थानाचा तपशील
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    onClick={getLocation}
                    className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-3 border-2 ${
                      gpsStatus === "success"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                        : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                    }`}
                  >
                    {gpsStatus === "fetching"
                      ? "Getting Location..."
                      : gpsStatus === "success"
                        ? "Location Captured! / स्थान मिळाले!"
                        : "Capture My GPS Location / माझे GPS स्थान मिळवा"}
                    {gpsStatus === "success" && <CheckCircle2 size={20} />}
                  </button>

                  <div>
                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                      Specific Landmarks / जवळपासच्या खुणा (Optional)
                    </label>
                    <textarea
                      name="manualLocation"
                      rows="2"
                      placeholder="e.g. Near Star Mall, under the flyover..."
                      value={formData.manualLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          manualLocation: e.target.value,
                        })
                      }
                      className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Condition Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Info className="text-rose-600" /> Person's Condition /
                  व्यक्तीची स्थिती
                </h3>
                <textarea
                  required
                  placeholder="Tell us about the person (Illness, age group, behavior)... / व्यक्तीबद्दल माहिती द्या (आजारपण, वय, वागणूक)..."
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 h-32 resize-none"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Camera className="text-rose-600" /> Upload Photo / फोटो अपलोड
                  करा
                </h3>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-[2rem] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500 font-bold">
                      Click to capture or upload / फोटो निवडा
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Reporter Info */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <User size={20} className="text-rose-600" /> Your Details /
                  तुमचे तपशील
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Your Name / तुमचे नाव"
                    value={formData.reporterName}
                    onChange={(e) =>
                      setFormData({ ...formData, reporterName: e.target.value })
                    }
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Your Phone / तुमचा फोन नंबर"
                    value={formData.reporterPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reporterPhone: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-rose-200 dark:shadow-none disabled:opacity-50 text-xl tracking-tight"
              >
                {loading
                  ? "Sending Alert..."
                  : "SEND EMERGENCY ALERT / तात्काळ अलर्ट पाठवा"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescueRequest;
