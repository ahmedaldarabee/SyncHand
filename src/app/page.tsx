"use client"

import { BrainCircuit, ClockArrowUp, Github, Hourglass, Instagram, Lightbulb, Linkedin, MailCheck, MonitorCheck, RefreshCcw, Repeat, ServerCrash, Target } from "lucide-react";
import Image from "next/image";
import emailjs from '@emailjs/browser';
import { useEffect, useRef } from "react";

import {useAuth} from '@clerk/nextjs'
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Page = () => {
  
 useEffect(() => {
    AOS.init({
        duration: 800,
        once: false,
    })
  }, [])
  return (
    <div className="poppins">
        <Navbar />
        <CTRSection />
        <Features />
        <About />
        <Contact />
        <Footer />
    </div>
  );
}

const Navbar = () => {
  return(
    <nav data-aos="fade-down" className="flex p-5 max-sm:p-2 max-sm:mt-3 items-center justify-between">
      <LogoSection />
      <ButtonsSection />
    </nav>
  )

  function LogoSection(){
    const commonStyle = "font-bold text-sky-600 capitalize"
    return(
      <div className="flex gap-1 items-center">
        <Repeat className="w-6 h-6 text-sky-600 hover:text-sky-800 transition-all" />

        <div className="flex gap-1 text-[22px]">
          <span className={commonStyle}>sync</span>
          <span className={commonStyle}>hand</span>
        </div>
      </div>
    )
  }

  function ButtonsSection(){
    const loggingStyle = "p-2 rounded-lg text-sm border border-sky-600 text-white bg-sky-600"
    
    const { userId } = useAuth();

    return(
      <div className="flex gap-2">
        {!userId ? (
          <>
            <Link href="/sign-in">
              <button className={loggingStyle}> Sign In </button>
            </Link>

            <Link href="/sign-up">
              <button className={loggingStyle}> Sign Up </button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <button className={` max-sm:w-full text-sm border bg-sky-600 text-white
              hover:bg-sky-600 hover:text-white p-[8px] px-6 rounded-md `}
            >
              Return Back
            </button>
          </Link>
        )}
      </div>
    )
  }
}

const CTRSection = () => {
  return(
    <div data-aos="fade-down" className="flex flex-col items-center mx-16 mt-[100px] gap-6">
      <h2 className="text-center text-xl font-bold capitalize">
        manage your projects and tasks in smart and modularity way
        <span className="text-sky-600"> Effortlessly!</span>
      </h2>

      <p className="text-center text-[15px] w-[510px] max-sm:w-full text-slate-500">      
        Take full control of your projects today start adding tasks, sorting your priorities, and tracking progress with ease. Stay organized and
        boost your productivity effortlessly!
      </p>

      <button type="button"className={`block bg-sky-600 rounded-md px-9 py-3 text-sm font-medium text-white hover:bg-sky-500 transition-all`}>
        <a  target="_blank" href="https://drive.google.com/drive/folders/1vn8-1pVPaWXyAgrPNMXStJegZBoGA4r5?usp=drive_link">
          Documentation
        </a>
      </button>

      <Image
        loading="lazy"
        src={"/landingpage.webp"}
        alt="dashboard image"
        width={900}
        height={400}
        className="shadow-xl mt-9 aspect-auto sm:w-auto w-[398px] rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-lg"
      />
    </div>
  )
}

const Features = () => {
  const features = [
    {
      id: 4,
      name: "Smart Project and Tasks Management",
      icon: <Lightbulb className="text-sky-600 text-[32px]" />,
      description: `Create, edit, and delete projects and tasks with ease. Use sorting, filtering, and tabs to keep your workspace organized.
      `
    },{
      id: 5,
      name: "Dynamic Interface with Responsive Design",
      icon: <MonitorCheck className="text-sky-600 text-[32px]" />,
      description: `Navigate through a responsive dashboard and task pages that adapt to any screen size. Open and close sidebars, dropdowns, and menus intuitively. enhancing your productivity.`
    },{
      id: 6,
      name: "Advanced Task Sorting and Progress Tracking",
      icon: <ClockArrowUp className="text-sky-600 text-[32px]" />,
      description: `Track ongoing and completed tasks, switch between tabs, and sort tasks or projects based on status, priority, or date to stay on top of your workload`
    }
  ]
  return (
    <div data-aos="fade-down" className="py-12 bg-slate-50 mt-12 px-9">
      <div className="mx-auto px-4">
        <h2 className="capitalize text-2xl font-bold text-center">synchand features</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 cursor-pointer ">
          {
            features.map((feature,index) => (
              <div 
                key={index}
                className="p-6 drop-shadow-xl bg-white rounded-lg flex flex-col items-center transition-all hover:-translate-y-3">

                  <div className="w-20 h-20 rounded-full items-center justify-center flex bg-sky-100">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-sky-600 mt-6 text-center"
                  >{feature.name}</h3>

                  <p 
                    className="text-slate-600 text-[13px] mt-2 text-center w-[80%]"
                  >
                    {feature.description}
                  </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const About = () => {
  const infos = [
    {
      id: 1,
      name: "Ahmed Al Darabee",
      title:"front end web developer" ,
      src:"/ahmed-aldarabee.jpg",
      linkedIn:"https://www.linkedin.com/in/ahmed-al-darabee/",
      gitHub:"https://github.com/ahmedaldarabee",
      insta:"https://www.instagram.com/se.ahmednayel/"
    },{
      id: 2,
      name: "Mohammad Hilal",
      title:"security engineering",
      src:"/mohammad.jpeg",
      linkedIn:"https://www.linkedin.com/in/mohammad-hilal-949561269/",
      gitHub:"https://github.com/Mohammadhilal03",
      insta:"https://www.instagram.com/_m7mdh__/"
    }
  ]
  return (
    <div data-aos="fade-down" className="about-us bg-white mt-3 p-12">
      <div className="container mx-auto">
        <h2 className="text-center font-semibold my-5 capitalize text-2xl">about us section</h2>
        <div className="boxes flex justify-center items-center gap-4 max-sm:flex-col md:flex-col lg:flex-row">
          {
            infos.map((info,index) => (
              <div className="w-[300px] max-w-full box border hover:border-sky-600 transition-all cursor-pointer border-sky-300 flex justify-center items-center flex-col p-5 rounded-md drop-shadow-2xl" key={index}>
                <Image className="rounded-lg" src={info.src} width={200} height={200} alt={`${info.name}`}/>
                <h1 className="font-semibold max-sm:text-[17px] capitalize mt-5">{info.title}</h1>
                
                <p className="text-[18px]">{info.name}</p>
                  <div className="links flex gap-4 my-3 cursor-pointer">
                    <a href={info.linkedIn} target="_blank"> <Linkedin className="icon" /> </a>
                    <a href={info.gitHub} target="_blank"> <Github className="icon" /> </a>
                    <a href={info.insta} target="_blank"> <Instagram className="icon" /> </a>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  
  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;
    
    emailjs.sendForm('service_iu8olds', 'template_fgl3b2u', formRef.current, 'Q05OrSC2J27GZu9tw');
    
    const formElement = event.target as HTMLFormElement;
    formElement.reset();
  };

  const messagesBox = [
    {
      id: 1,
      icon: <ServerCrash />,
      message: "website problems",
      description: "Report issues with my website",
    },{
      id: 2,
      icon: <MailCheck />,
      message: "feedback section",
      description: "Share your ideas about my website",
    },{
      id: 3,
      icon: <ServerCrash />,
      message: "general inquiry",
      description: "Contact me for general questions",
    }
  ]
  return(
    <div data-aos="fade-down" className="contact p-10 bg-slate-50 mt-2">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl capitalize my-4">contact us section</h2>
          <div className="flex justify-center lg:flex-row max-sm:flex-col md:flex-col items-center gap-8">
            <div className="max-sm:w-[100%] message-boxes w-[50%] mx-auto">
              <div className="boxes flex items-center justify-center flex-col gap-2">
                  {
                    messagesBox.map((message) => (
                      <div key={message.id} className=" cursor-pointer transition-all hover:border-sky-700 rounded-md w-[250px] text-center flex items-center justify-center flex-col box border border-sky-500 p-4 hover:bg-slate-100">
                        <p>{message.icon}</p>
                        <p className="capitalize font-semibold">{message.message}</p>
                        <p className="text-[16px]">{message.description}</p>
                      </div>
                    ))
                  }
              </div>
            </div>

            <div className="max-sm:w-[100%] form border border-slate-100 w-[50%]">
                <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5">
                  <input  required name="username" className="inputs" type="text" placeholder="Enter Full Name" />
                  <input  required name="useremail" className="inputs" type="email" placeholder="Enter Full Email" />
                  <textarea required  name="usermessage" rows={8} className="inputs" placeholder="Enter your message here please"></textarea>
                  <button className="hover:bg-sky-600 transition-all cursor-pointer bg-sky-500 px-7 py-2 text-white rounded-lg" type="submit">send message</button>
                </form>
            </div>

          </div>
      </div>
    </div>
  )
}

const Footer = () => {
  const features = [
    {
      id:1,
      name: "Task Management",
      description: "Efficiently organize and prioritize tasks with our intuitive task management feature. Track progress, set deadlines, and ensure your team stays on top of their responsibilities."
    },{
      id:2,
      name: "Collaboration Tools",
      description: "Enhance team collaboration with real-time communication, file sharing, and collaborative editing. Keep everyone connected and working together seamlessly."
    },{
      id:3,
      name: "Reporting & Analytics",
      description: "Gain valuable insights into project performance with comprehensive reporting and analytics. Monitor key metrics, identify trends, and make data-driven decisions to optimize your workflow."
    }
  ]
  const icons = [
    {
      id:1,
      icon: <Hourglass />,
      title:"Save your time"
    },{
      id:2,
      icon: <BrainCircuit />,
      title:"Modular AI assistance for you"
    },{
      id:3,
      icon: <Target />,
      title:"Help you to get your target"
    },{
      id:4,
      icon: <RefreshCcw />,
      title:"operations in synchronous way"
    }
  ]
  return(
    <div data-aos="fade-down" className="w-full cursor-pointer bg-slate-100">

      <div className="w-full border-b border-slate-300 p-5 bg-slate-200 text-center cursor-pointer flex items-center justify-between gap-2 lg:flex-row max-sm:flex-col md:flex-col">
          <p className="text-[18px]">Thank you for visit us</p>
          <div className="flex justify-center items-center gap-3">
            {
              icons.map((icon) => (
                <div className="w-4 h-4 mx-2" key={icon.id} title={`${icon.title}`}> {icon.icon} </div>
              ))
            }
          </div>
      </div>

      <div className="p-5 w-full flex items-center justify-center lg:flex-row md:flex-col max-sm:flex-col gap-3">

        <div>
          <Image src={"/SyncHand.png"} alt="sync hand logo" className="lg:w-[800px] md:w-[400px] sm:w-[200px]" width={800} height={200} />
        </div>

          <div className="boxes flex items-center justify-between gap-5 lg:flex-row md:flex-col max-sm:flex-col ">
              {
                features.map((feature,index) => (
                  <div key={index} className="flex  text-center flex-col items-center justify-center">
                      <h3 className="my-2 font-semibold">{feature.name}</h3>
                      <p className="text-[15px]">{feature.description}</p>
                  </div>
                ))
              }
          </div>
      </div>

      <div className="mt-2 w-full border-t border-slate-300 bg-slate-200 p-5 text-center cursor-pointer flex flex-col gap-2">
          <p className="hover:translate-x-2 transition-all">all rights are recurved &copy; 2025 - <span className="font-semibold text-sky-500">SyncHand</span></p>
          <p className="text-[14px]">ahmed darabee & mohammad hilal </p>
      </div>
    </div>
  )
}

export default Page;