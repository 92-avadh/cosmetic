"use client";

import { useState } from "react";
import { useAdminContext } from "../context";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";

export default function AdminReportsPage() {
  const { orders } = useAdminContext();

  // Reports Filter States
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");
  const [reportStatus, setReportStatus] = useState("ALL");
  const [reportSortKey, setReportSortKey] = useState("date_desc");
  const [reportSearch, setReportSearch] = useState("");

  // Report filters and sorting
  const filteredReportOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(reportSearch.toLowerCase()) ||
        (order.user?.email || "").toLowerCase().includes(reportSearch.toLowerCase()) ||
        order.shippingName.toLowerCase().includes(reportSearch.toLowerCase());

      const matchesStatus = reportStatus === "ALL" || order.status === reportStatus;

      let matchesDate = true;
      if (reportStartDate) {
        const start = new Date(reportStartDate);
        start.setHours(0, 0, 0, 0);
        matchesDate = matchesDate && new Date(order.createdAt) >= start;
      }
      if (reportEndDate) {
        const end = new Date(reportEndDate);
        end.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && new Date(order.createdAt) <= end;
      }

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      if (reportSortKey === "date_desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (reportSortKey === "date_asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (reportSortKey === "email_asc") {
        return (a.user?.email || "").localeCompare(b.user?.email || "");
      }
      if (reportSortKey === "email_desc") {
        return (b.user?.email || "").localeCompare(a.user?.email || "");
      }
      if (reportSortKey === "total_desc") {
        return b.totalUSD - a.totalUSD;
      }
      if (reportSortKey === "total_asc") {
        return a.totalUSD - b.totalUSD;
      }
      return 0;
    });

  const generatePDFReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Error: Blocked by popup blocker. Please allow popups for this site.");
      return;
    }

    const totalOrdersCount = filteredReportOrders.length;
    const totalSalesSum = filteredReportOrders.reduce((sum, o) => sum + o.totalUSD, 0);
    const pendingOrdersCount = filteredReportOrders.filter((o) => o.status === "PENDING").length;
    const paidOrdersCount = filteredReportOrders.filter(
      (o) => o.status === "PAID" || o.status === "SHIPPED" || o.status === "DELIVERED"
    ).length;
    const cancelledOrdersCount = filteredReportOrders.filter((o) => o.status === "CANCELLED").length;

    const reportRows = filteredReportOrders
      .map((order) => {
        const formattedItems = order.items
          .map((item) => `${item.product?.name || "Unknown"} (x${item.quantity})`)
          .join(", ");
        return `
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 10px;">
          <td style="padding: 10px; text-transform: uppercase;">#${order.id.slice(0, 8)}</td>
          <td style="padding: 10px;">${new Date(order.createdAt).toLocaleDateString()}</td>
          <td style="padding: 10px; font-weight: 500;">${order.user?.email || "Unknown"}</td>
          <td style="padding: 10px; color: #4a5568; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${
            order.shippingName
          }, ${order.shippingCity}</td>
          <td style="padding: 10px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${formattedItems}</td>
          <td style="padding: 10px; font-weight: bold; color: ${
            order.status === "DELIVERED"
              ? "#059669"
              : order.status === "CANCELLED"
              ? "#dc2626"
              : order.status === "SHIPPED"
              ? "#2563eb"
              : "#d97706"
          };">${order.status}</td>
          <td style="padding: 10px; text-align: right; font-weight: bold;">$${order.totalUSD.toFixed(
            2
          )}</td>
        </tr>
      `;
      })
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order & Payment Executive Report</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            padding: 40px;
            color: #1a202c;
            background-color: #ffffff;
            margin: 0;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-b: 2px solid #1a202c;
            padding-bottom: 20px;
            margin-bottom: 30px;
            text-align: left;
          }
          .title {
            font-size: 20px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin: 0;
          }
          .meta-info {
            font-size: 10px;
            color: #718096;
            text-align: right;
            line-height: 1.5;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
            margin-bottom: 35px;
          }
          .metric-card {
            border: 1px solid #e2e8f0;
            padding: 15px;
            border-radius: 8px;
            background-color: #f7fafc;
            text-align: left;
          }
          .metric-label {
            font-size: 8px;
            font-weight: bold;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
          }
          .metric-value {
            font-size: 16px;
            font-weight: bold;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            text-align: left;
          }
          th {
            background-color: #1a202c;
            color: white;
            text-align: left;
            padding: 10px;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.15em;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">BodyBarrel Executive Report</h1>
            <p style="font-size: 11px; margin: 5px 0 0 0; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em;">Skincare Formulation & Client Orders Registry</p>
          </div>
          <div class="meta-info">
            Generated: ${new Date().toLocaleString()}<br />
            Scope: ${reportStartDate || "All Time"} to ${reportEndDate || "Present"}
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Sales Revenue</div>
            <div class="metric-value" style="color: #059669;">$${totalSalesSum.toFixed(2)}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Total Volume</div>
            <div class="metric-value">${totalOrdersCount} Orders</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Paid / Fulfilled</div>
            <div class="metric-value">${paidOrdersCount}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Pending / Unpaid</div>
            <div class="metric-value">${pendingOrdersCount}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Cancelled</div>
            <div class="metric-value" style="color: #dc2626;">${cancelledOrdersCount}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 10%;">Order ID</th>
              <th style="width: 12%;">Date</th>
              <th style="width: 22%;">Customer Email</th>
              <th style="width: 18%;">Destination</th>
              <th style="width: 23%;">Formulations</th>
              <th style="width: 8%;">Status</th>
              <th style="text-align: right; width: 7%;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${
              reportRows ||
              `<tr><td colspan="7" style="padding: 20px; text-align: center; color: #718096; font-size: 11px; text-transform: uppercase;">No registry data matching filters was discovered.</td></tr>`
            }
          </tbody>
        </table>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-3 text-left">
        <div>
          <h3 className="font-display font-semibold text-base uppercase text-ink">Executive Report Desk</h3>
          <p className="text-[11px] text-muted mt-0.5">Filter sales transactions, monitor performance metrics, and generate print-friendly reports.</p>
        </div>
        <button
          onClick={generatePDFReport}
          className="flex items-center gap-2 px-5 py-2.5 bg-ink text-bg border border-ink rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-accent hover:border-accent hover:text-bg transition-colors cursor-pointer animate-pulse"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Generate PDF Report</span>
        </button>
      </div>

      {/* Quick Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-left">
        <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
          <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Total Sales</span>
          <span className="text-base font-bold text-emerald-600">
            ${filteredReportOrders.reduce((sum, o) => sum + o.totalUSD, 0).toFixed(2)}
          </span>
        </div>
        <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
          <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Orders count</span>
          <span className="text-base font-bold text-ink">{filteredReportOrders.length}</span>
        </div>
        <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
          <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Paid / Shipped</span>
          <span className="text-base font-bold text-blue-600">
            {filteredReportOrders.filter((o) => o.status === "PAID" || o.status === "SHIPPED" || o.status === "DELIVERED").length}
          </span>
        </div>
        <div className="p-4 bg-bg/40 border border-line rounded-xl space-y-1">
          <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Pending / Unpaid</span>
          <span className="text-base font-bold text-amber-600">
            {filteredReportOrders.filter((o) => o.status === "PENDING").length}
          </span>
        </div>
        <div className="p-4 bg-bg/40 border border-line rounded-xl col-span-2 md:col-span-1 space-y-1">
          <span className="text-[8px] font-bold text-muted uppercase tracking-widest block">Cancelled</span>
          <span className="text-base font-bold text-red-500">
            {filteredReportOrders.filter((o) => o.status === "CANCELLED").length}
          </span>
        </div>
      </div>

      {/* Filters Form Controls */}
      <div className="bg-bg/40 border border-line rounded-xl p-5 space-y-4 text-left">
        <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Configure Scope & Filter Criteria</h4>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="space-y-1.5 col-span-1">
            <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Start Date</label>
            <input
              type="date"
              value={reportStartDate}
              onChange={(e) => setReportStartDate(e.target.value)}
              className="w-full bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">End Date</label>
            <input
              type="date"
              value={reportEndDate}
              onChange={(e) => setReportEndDate(e.target.value)}
              className="w-full bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Order Status</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-[10px] uppercase tracking-wider h-9 justify-between items-center cursor-pointer">
                  <span>{reportStatus === "ALL" ? "All Statuses" : reportStatus}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onClick={() => setReportStatus("ALL")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportStatus("PENDING")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportStatus("PAID")}>Paid</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportStatus("SHIPPED")}>Shipped</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportStatus("DELIVERED")}>Delivered</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportStatus("CANCELLED")}>Cancelled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Sort Registry By</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-[10px] uppercase tracking-wider h-9 justify-between items-center cursor-pointer">
                  <span>
                    {reportSortKey === "date_desc" ? "Date: Newest" :
                     reportSortKey === "date_asc" ? "Date: Oldest" :
                     reportSortKey === "email_asc" ? "Email: A to Z" :
                     reportSortKey === "email_desc" ? "Email: Z to A" :
                     reportSortKey === "total_desc" ? "Total: High-Low" :
                     reportSortKey === "total_asc" ? "Total: Low-High" : "Sorted"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onClick={() => setReportSortKey("date_desc")}>Date: Newest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportSortKey("date_asc")}>Date: Oldest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportSortKey("email_asc")}>Email: A to Z</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportSortKey("email_desc")}>Email: Z to A</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportSortKey("total_desc")}>Total: High-Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportSortKey("total_asc")}>Total: Low-High</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="text-[7.5px] uppercase tracking-widest font-bold text-ink block">Text Match Search</label>
            <input
              type="text"
              placeholder="Search Email, Name, ID..."
              value={reportSearch}
              onChange={(e) => setReportSearch(e.target.value)}
              className="w-full bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* List matching orders table */}
      <div className="bg-bg/40 border border-line rounded-xl overflow-hidden text-left">
        <div className="p-5 border-b border-line">
          <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Matching Transactions Registry</h4>
        </div>

        {filteredReportOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-bg border-b border-line font-bold text-[8.5px] uppercase tracking-wider text-muted">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer Email</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredReportOrders.map((order) => (
                  <tr key={order.id} className="border-b border-line/45 hover:bg-bg/15 transition-colors">
                    <td className="p-4 font-mono text-[10px] uppercase">#{order.id.slice(0, 8)}</td>
                    <td className="p-4 text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold text-ink">{order.user?.email || "Unknown"}</td>
                    <td className="p-4 text-muted truncate max-w-[150px]">{order.shippingName}, {order.shippingCity}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[8.5px] font-bold tracking-widest uppercase border ${
                        order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        order.status === "CANCELLED" ? "bg-red-50 text-red-500 border-red-100" :
                        order.status === "SHIPPED" ? "bg-blue-50 text-blue-500 border-blue-100" :
                        "bg-accent/15 text-accent border-accent/20"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-ink">${order.totalUSD.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 uppercase text-[10px] tracking-widest text-muted">
            No transaction registry matches your configuration criteria.
          </div>
        )}
      </div>
    </div>
  );
}
