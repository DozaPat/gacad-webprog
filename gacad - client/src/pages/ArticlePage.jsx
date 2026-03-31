import Button from '../components/Button';
import about2 from '../assets/styles/about2.jpg';
import about3 from '../assets/styles/about3.jpg';
import about4 from '../assets/styles/about4.jpg';
import cardthree from '../assets/styles/cardthree.jpg';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          AGAP COMPANY PROJECTS
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          a detailed project overview of our company.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">AGAP Projects</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Article 01 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <img 
                  src={about2} 
                  alt="AGAP - Alex Gacad and Partners" 
                  className="w-full h-full object-cover object-top" 
                />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Wireframe layout basics</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Inside the glass house door project.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article 02 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <img 
                  src={about3} 
                  alt="AGAP - Alex Gacad and Partners" 
                  className="w-full h-full object-cover object-top" 
                />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Building Estimation</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Project Cost.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article 03 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <img 
                  src={about4} 
                  alt="AGAP - Alex Gacad and Partners" 
                  className="w-full h-full object-cover object-top" 
                />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Condo Overview</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Newport Project Overview.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article 04 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <img 
                  src={cardthree} 
                  alt="AGAP - Alex Gacad and Partners" 
                  className="w-full h-full object-cover object-top" 
                />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Building the Office for the Port Company</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Project
            </p>
            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;