import React from 'react';
import { BookOpen, Video, BrainCircuit, MessageCircleQuestion } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "লেকচার শিট",
    description: "প্রতিটি অধ্যায়ের উপর বিস্তারিত রঙিন লেকচার শিট ও প্র্যাকটিস বুক।",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    border: "border-blue-500/20",
    shadow: "shadow-blue-500/10"
  },
  {
    icon: Video,
    title: "রেকর্ডেড ক্লাস",
    description: "যেকোনো সময় যেকোনো স্থান থেকে ক্লাস করার সুযোগ। আনলিমিটেড অ্যাক্সেস।",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    border: "border-violet-500/20",
    shadow: "shadow-violet-500/10"
  },
  {
    icon: BrainCircuit,
    title: "লাইভ এক্সাম",
    description: "প্রতিদিন ও সাপ্তাহিক লাইভ এক্সাম এবং ইনস্ট্যান্ট রেজাল্ট ও লিডারবোর্ড।",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    border: "border-emerald-500/20",
    shadow: "shadow-emerald-500/10"
  },
  {
    icon: MessageCircleQuestion,
    title: "সলভ ক্লাস",
    description: "কঠিন টপিক ও এক্সাম পেপারের ওপর বিশেষ লাইভ সলভ ক্লাস।",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    border: "border-amber-500/20",
    shadow: "shadow-amber-500/10"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B1121] relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
           <span className="text-indigo-400 font-bold tracking-wider text-xs uppercase mb-3 block px-3 py-1 bg-indigo-500/10 rounded-full w-fit mx-auto border border-indigo-500/20">Why Choose Us</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">আমাদের বিশেষত্ব</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">আমরা নিশ্চিত করি সর্বোচ্চ মানের শিক্ষা এবং আধুনিক প্রযুক্তির সঠিক ব্যবহার, যা তোমাকে রাখবে সবার চেয়ে এগিয়ে।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-8 rounded-[2rem] bg-white/5 border border-white/5 shadow-xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm`}
            >
              {/* Top Gradient Line */}
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.iconBg}`}></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-4 ring-black/20`}>
                  <feature.icon size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
              </div>

              {/* Background decorative blob */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-20 ${feature.bg} blur-2xl`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};