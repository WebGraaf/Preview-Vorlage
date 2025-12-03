import { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DataRow {
  name: string;
  fahrstunde: number;
  grundgebuehr: number;
  sonderfahrt: number;
}

export function Preisliste() {
  const [sortKey, setSortKey] = useState<keyof DataRow>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const data: DataRow[] = [
    { name: 'AM', fahrstunde: 45, grundgebuehr: 150, sonderfahrt: 60 },
    { name: 'A1', fahrstunde: 50, grundgebuehr: 200, sonderfahrt: 65 },
    { name: 'A2', fahrstunde: 55, grundgebuehr: 250, sonderfahrt: 70 },
    { name: 'A', fahrstunde: 60, grundgebuehr: 300, sonderfahrt: 75 },
    { name: 'BF17', fahrstunde: 40, grundgebuehr: 120, sonderfahrt: 50 },
    { name: 'B', fahrstunde: 45, grundgebuehr: 180, sonderfahrt: 55 },
    { name: 'B96', fahrstunde: 42, grundgebuehr: 160, sonderfahrt: 52 },
    { name: 'BE', fahrstunde: 50, grundgebuehr: 220, sonderfahrt: 60 },
    { name: 'B196', fahrstunde: 47, grundgebuehr: 190, sonderfahrt: 57 },
    { name: 'B197', fahrstunde: 46, grundgebuehr: 185, sonderfahrt: 56 },
    { name: 'C1', fahrstunde: 55, grundgebuehr: 250, sonderfahrt: 70 },
    { name: 'C1E', fahrstunde: 60, grundgebuehr: 280, sonderfahrt: 75 },
    { name: 'C', fahrstunde: 65, grundgebuehr: 320, sonderfahrt: 80 },
    { name: 'CE', fahrstunde: 70, grundgebuehr: 350, sonderfahrt: 85 },
    { name: 'D1', fahrstunde: 60, grundgebuehr: 300, sonderfahrt: 75 },
    { name: 'D1E', fahrstunde: 65, grundgebuehr: 330, sonderfahrt: 80 },
    { name: 'D', fahrstunde: 70, grundgebuehr: 380, sonderfahrt: 85 },
    { name: 'DE', fahrstunde: 75, grundgebuehr: 420, sonderfahrt: 90 },
    { name: 'L', fahrstunde: 35, grundgebuehr: 100, sonderfahrt: 45 },
    { name: 'T', fahrstunde: 40, grundgebuehr: 130, sonderfahrt: 50 }
  ];

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const modifier = sortOrder === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    return (Number(aVal) - Number(bVal)) * modifier;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(".price-title",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate table container
      gsap.fromTo(tableRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate pagination
      gsap.fromTo(paginationRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSort = (key: keyof DataRow) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }: { column: keyof DataRow }) => {
    if (sortKey !== column) return <ChevronsUpDown className="w-4 h-4 text-primary-400" />;
    return sortOrder === 'asc' ?
      <ChevronUp className="w-4 h-4 text-primary-600" /> :
      <ChevronDown className="w-4 h-4 text-primary-600" />;
  };

  return (
    <section ref={sectionRef} className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="price-title text-4xl font-bold text-text-heading mb-4">
            Preisliste Fahrschulen
          </h2>
        </div>

        <div ref={tableRef} className="price-table bg-table-bg rounded-xl shadow-xl border border-table-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-table-header-bg border-b border-table-border">
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="px-6 py-4 text-left font-semibold text-primary-900 cursor-pointer hover:bg-table-row-hover transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Führerschein-Klasse
                      <SortIcon column="name" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('fahrstunde')}
                    className="px-6 py-4 text-right font-semibold text-primary-700 cursor-pointer hover:bg-table-row-hover transition-colors"
                  >
                    <div className="flex items-center justify-end gap-2">
                      Fahrstunde (€)
                      <SortIcon column="fahrstunde" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('grundgebuehr')}
                    className="px-6 py-4 text-right font-semibold text-primary-700 cursor-pointer hover:bg-table-row-hover transition-colors"
                  >
                    <div className="flex items-center justify-end gap-2">
                      Grundgebühr (€)
                      <SortIcon column="grundgebuehr" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('sonderfahrt')}
                    className="px-6 py-4 text-right font-semibold text-primary-700 cursor-pointer hover:bg-table-row-hover transition-colors"
                  >
                    <div className="flex items-center justify-end gap-2">
                      Sonderfahrt (€)
                      <SortIcon column="sonderfahrt" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-table-border">
                {paginatedData.map((row, index) => (
                  <tr key={index} className="hover:bg-table-row-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-table-fg">{row.name}</td>
                    <td className="px-6 py-4 text-right text-table-fg">{row.fahrstunde} €</td>
                    <td className="px-6 py-4 text-right font-medium text-table-fg">{row.grundgebuehr} €</td>
                    <td className="px-6 py-4 text-right text-status-success font-medium">{row.sonderfahrt} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div ref={paginationRef} className="price-pagination bg-table-bg px-6 py-4 border-t border-table-border flex items-center justify-between">
            <div className="text-sm text-primary-600">
              Zeige {(currentPage - 1) * itemsPerPage + 1} bis {Math.min(currentPage * itemsPerPage, sortedData.length)} von {sortedData.length} Einträgen
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-primary-300 rounded-lg text-primary-900 hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Vorherige
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary-50 text-primary-900'
                       : 'border border-primary-300 text-primary-900 hover:bg-primary-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-primary-300 rounded-lg text-primary-700 hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Nächste
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}