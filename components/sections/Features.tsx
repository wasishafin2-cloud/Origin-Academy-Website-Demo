import React from 'react';
import { BookOpen, Video, BrainCircuit, MessageCircleQuestion } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "লেকচার শিট",
    description: "প্রতিটি অধ্যায়ের উপর বিস্তারিত রঙিন লেকচার শিট ও প্র্যাকটিস বুক।",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
    gradient: "from-blue-50 to-white"
  },
  {
    icon: Video,
    title: "রেকর্ডেড ক্লাস",
    description: "যেকোনো সময় যেকোনো স্থান থেকে ক্লাস করার সুযোগ। আনলিমিটেড অ্যাক্সেস।",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
    gradient: "from-purple-50 to-white"
  },
  {
    icon: BrainCircuit,
    title: "লাইভ এক্সাম",
    description: "প্রতিদিন ও সাপ্তাহিক লাইভ এক্সাম এবং ইনস্ট্যান্ট রেজাল্ট ও লিডারবোর্ড।",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "group-hover:border-green-200",
    gradient: "from-green-50 to-white"
  },
  {
    icon: MessageCircleQuestion,
    title: "সলভ ক্লাস",
    description: "কঠিন টপিক ও এক্সাম পেপারের ওপর বিশেষ লাইভ সলভ ক্লাস।",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "group-hover:border-orange-200",
    gradient: "from-orange-50 to-white"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
           <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-2 block">Why Choose Us</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">আমাদের বিশেষত্ব</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">আমরা নিশ্চিত করি সর্বোচ্চ মানের শিক্ষা এবং আধুনিক প্রযুক্তির সঠিক ব্যবহার</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-8 rounded-[2rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${feature.border}`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm`}>
                  <feature.icon size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:translate-x-1 transition-transform">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
              </div>

              {/* Background decorative icon */}
              <feature.icon className={`absolute -bottom-4 -right-4 w-32 h-32 opacity-5 ${feature.color} -rotate-12 group-hover:rotate-0 transition-transform duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};