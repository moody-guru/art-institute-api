import React, { useState, useEffect, useRef } from "react";
import { DataTable, type DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { fetchArtworks } from "../services/api";
import type { Artwork } from "../types";
import SelectionOverlay from "./SelectionOverlay";

const ArtTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
  const op = useRef<OverlayPanel>(null);

  const rowsPerPage = 12;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchArtworks(page);
        setArtworks(res.data);
        setTotalRecords(res.pagination.total);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page]);

  const handleBulkSelect = (count: number) => {
    const newSelections = artworks.slice(0, count);
    setSelectedRows((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const filteredNew = uniqueNewOnes(newSelections, existingIds);
      return [...prev, ...filteredNew];
    });
    op.current?.hide();
  };

  const uniqueNewOnes = (items: Artwork[], existingIds: Set<number>) => {
    return items.filter((item) => !existingIds.has(item.id));
  };

  // Custom Header for the Checkbox Column (Chevron trigger)
  const checkboxHeader = (
    <div className="flex align-items-center">
      <i
        className="pi pi-chevron-down cursor-pointer p-1 border-round hover:surface-200"
        onClick={(e) => op.current?.toggle(e)}
        style={{ fontSize: "0.8rem", color: "#666" }}
      ></i>
    </div>
  );

  return (
    <div className="card p-4 shadow-1 border-round bg-white">
        // Display selected count

      <div className="mb-3 text-left">
        <span className="text-xl font-medium" style={{ color: "#4b5563" }}>
          Selected: <span className="text-blue-600">{selectedRows.length}</span>{" "}
          {selectedRows.length === 1 ? "row" : "rows"}
        </span>
      </div>

      <OverlayPanel ref={op} showCloseIcon dismissable>
        <SelectionOverlay onSelect={handleBulkSelect} />
      </OverlayPanel>

        // DataTable with pagination, selection, and custom header for checkboxes
      <DataTable
        value={artworks}
        lazy
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        first={(page - 1) * rowsPerPage}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPage={(e: DataTableStateEvent) => setPage((e.page ?? 0) + 1)}
        loading={loading}
        selection={selectedRows}
        onSelectionChange={(e) =>
          setSelectedRows(e.value as unknown as Artwork[])
        }
        selectionMode="multiple"
        dataKey="id"
        tableStyle={{ minWidth: "60rem" }}
        className="p-datatable-sm p-datatable-striped"
      >
        // column for checkboxes with custom header (chevron)
        <Column
          selectionMode="multiple"
          header={checkboxHeader}
          headerStyle={{ width: "3rem" }}
        />
        <Column field="title" header="TITLE" />
        <Column field="place_of_origin" header="ORIGIN" />
        <Column field="artist_display" header="ARTIST" />
        <Column field="inscriptions" header="INSCRIPTIONS" />
        <Column field="date_start" header="START DATE" />
        <Column field="date_end" header="END DATE" />
      </DataTable>
    </div>
  );
};

export default ArtTable;
