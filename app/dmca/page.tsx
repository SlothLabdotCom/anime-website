import React from 'react';

const DMCA = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white text-center p-4" style={{ color: 'white', alignContent: 'center', paddingLeft: 20 }}>
      <h1 className="text-lg font-bold mb-6 mt-6 text-white" style={{fontSize: 30, paddingTop: 20}}>
         DMCA takedown request requirements
      </h1>

      <section className="mb-10">
        <p className="mb-4 text-sm" style={{fontSize: 15, lineHeight: 1.5, paddingTop: 15}}>
        We take the intellectual property rights of others seriously and require that our Users do the same. The Digital Millennium Copyright Act (DMCA) established a process for addressing claims of copyright infringement. If you own a copyright or have authority to act on behalf of a copyright owner and want to report a claim that a third party is infringing that material on or through GitLab's services, please submit a DMCA report on our Contact page, and we will take appropriate action.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 mt-4 text-white"style={{fontSize: 30, paddingTop: 35}}>DMCA Report requirements</h2>
        <ul className="terms-list" style={{lineHeight: 1.2}}>
        <li>. A description of the copyrighted work that you claim is being infringed;</li>
        <li>. A description of the material you claim is infringing and that you want removed or access to which you want disabled and the URL or other location of that material;</li>
        <li>. Your name, title (if acting as an agent), address, telephone number, and email address;</li>
        <li>. The following statement: "I have a good faith belief that the use of the copyrighted material I am complaining of is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)";</li>
        <li>
          . The following statement: "The information in this notice is accurate and, under penalty of perjury, I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right that is allegedly infringed";
        </li>
        <li>
          . An electronic or physical signature of the owner of the copyright or a person authorized to act on the owner's behalf.
        </li>
      </ul>
      <p className="mb-4 text-sm" style={{ fontSize: 15, lineHeight: 2, paddingTop: 5 }}>
        Your DMCA take down request should be submitted here:{" "}
        <a href="mailto://animeabyss@tuta.io" target="_blank" className="text-blue-500 hover:text-blue-700">
            https://animeabyss@tuta.io
        </a>
        <br />
        We will then review your DMCA request and take proper actions, including removal of the content from the website.
        </p>

      </section>

      
     
    </div>
  );
};

export default DMCA;
