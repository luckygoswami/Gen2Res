import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useInterview } from '@/features/interview';
import { useState } from 'react';
import { useEffect } from 'react';

export function Reports() {
  const [reports, setReports] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const { loading, getReports, deleteReport } = useInterview();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const formatDateTime = (date) => {
    const d = new Date(date);

    const formattedDate = d.toDateString().split(' ').slice(1).join(' ');

    const formattedTime = d
      .toLocaleTimeString([], {
        hour12: false,
      })
      .split(':')
      .slice(0, 2)
      .join(':');

    return `${formattedDate}, ${formattedTime}`;
  };

  const handleDelete = async (reportId) => {
    try {
      await deleteReport(reportId);

      setReports((prev) => prev.filter((rep) => rep._id !== reportId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { reports, pagination } = await getReports({
        page: currentPage,
        limit: 10,
        pagination: true,
      });
      setReports(reports);
      setPaginationData(pagination);
    };

    fetch();
  }, [currentPage]);

  if (loading || !reports) return <main>Loading...</main>;

  const { limit, page, total, totalPages } = paginationData;

  return (
    <main className="overflow-auto p-margin_desktop max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-stack_lg gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
            Interview Reports
          </h2>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Manage and review your AI-generated assessment summaries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="flex items-center gap-2 px-6 py-2 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md font-bold hover:opacity-90 transition-opacity shadow-sm"
            to={'/'}>
            <span
              className="material-symbols-outlined text-lg"
              data-icon="add">
              add
            </span>
            Generate New
          </Link>
        </div>
      </div>
      {/* Table Container */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-label-md text-label-md text-secondary uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-4 font-label-md text-label-md text-secondary uppercase tracking-wider">
                  Match Score
                </th>
                <th className="px-6 py-4 font-label-md text-label-md text-secondary uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-4 font-label-md text-label-md text-secondary uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {reports.map((rep, i) => (
                <tr
                  key={rep._id}
                  onClick={() => navigate(rep._id)}
                  className="group hover:bg-surface-container transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center text-primary">
                        <span
                          className="material-symbols-outlined text-lg"
                          data-icon="person">
                          description
                        </span>
                      </div>
                      <span className="font-body-md text-body-md font-semibold text-on-surface">
                        {rep.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary-container h-full"
                          style={{
                            width: `${rep.matchScore}%`,
                          }}></div>
                      </div>
                      <span className="font-label-md text-label-md font-bold text-primary">
                        {rep.matchScore}/100
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-body-md text-body-md text-secondary">
                    {formatDateTime(rep.createdAt)}
                  </td>
                  <td className="px-6 py-5 text-right relative">
                    <div className="text-outline hover:text-primary transition-color group/action">
                      <span
                        className="material-symbols-outlined"
                        data-icon="more_vert">
                        more_vert
                      </span>
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 mt-2 w-32 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl opacity-0 invisible group-hover/action:opacity-100 group-hover/action:visible transition-all z-50 overflow-hidden">
                        <div className="p-1">
                          <button
                            className="w-full flex items-center gap-3 px-3 py-2 text-label-md text-error hover:bg-error/5 rounded-lg transition-colors font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(rep._id);
                            }}>
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
          <span className="font-label-md text-label-md text-secondary">
            {`Showing ${(page - 1) * limit + 1} to ${Math.min(page * limit, total)} of ${total} reports`}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center size-8 rounded border border-outline-variant text-secondary hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}>
              <span className="material-symbols-outlined text-lg">
                chevron_left
              </span>
            </button>
            {new Array(totalPages).fill(undefined).map((_, i) => {
              if (totalPages < 5) {
                return (
                  <button
                    key={i}
                    className={`px-3 py-2 ${currentPage === i + 1 ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high'} rounded font-label-md text-label-md`}
                    onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                );
              } else {
                if (i < 2) {
                  return (
                    <button
                      key={i}
                      className={`px-3 py-2 ${currentPage === i + 1 ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high'} rounded font-label-md text-label-md`}
                      onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  );
                } else if (i === totalPages - 2) {
                  return currentPage > 2 && currentPage < totalPages ?
                      <span
                        key={i}
                        className="text-lg px-1 text-primary font-semibold underline decoration-dotted decoration-2 underline-offset-8">
                        {currentPage}
                      </span>
                    : <span
                        key={i}
                        className="text-sm px-1 text-secondary">
                        ...
                      </span>;
                } else if (i === totalPages - 1) {
                  return (
                    <button
                      key={i}
                      className={`px-3 py-2 ${currentPage === i + 1 ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high'} rounded font-label-md text-label-md`}
                      onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  );
                }
              }
            })}
            <button
              className="flex items-center justify-center size-8 rounded border border-outline-variant text-secondary hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}>
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Footer Meta Info */}
      <div className="mt-stack_lg grid grid-cols-1 md:grid-cols-2 gap-gutter text-secondary">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/50">
          <h3 className="font-label-md text-label-md font-bold mb-2 flex items-center gap-2 text-on-surface">
            <span
              className="material-symbols-outlined text-lg text-primary"
              data-icon="database">
              database
            </span>
            Report Analytics
          </h3>
          <p className="text-body-md text-secondary">
            Data is synced in real-time with the candidate evaluation engine to
            ensure your metrics are always up-to-date and accurate across all
            recruitment pipelines.
          </p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/50">
          <h3 className="font-label-md text-label-md font-bold mb-2 flex items-center gap-2 text-on-surface">
            <span
              className="material-symbols-outlined text-lg text-primary"
              data-icon="info_i">
              info_i
            </span>
            Usage &amp; Limits
          </h3>
          <p className="text-body-md text-secondary">
            Reports are automatically archived after 12 months. For custom data
            retention policies or enterprise configurations, please contact our
            support team.
          </p>
        </div>
      </div>
    </main>
  );
}
