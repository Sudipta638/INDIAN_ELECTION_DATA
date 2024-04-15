"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export const columns = [
    {
      accessorKey: "cand_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="capitalize flex justify-center items-center text-lg  pl-10"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-gray-700 font-semibold pl-6 w-60">
          {row.getValue("cand_name")}
        </div>
      ),
    },
    {
      accessorKey: "Sex",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-lg"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sex
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize  ml-4">{row.getValue("Sex")}</div>
      ),
    },
    {
      accessorKey: "st_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-lg"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            State
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue("st_name")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "year",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="capitalize  text-lg"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Year
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("year")}</div>
      ),
    },
    {
      accessorKey: "vote_percentage",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="capitalize  text-lg"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Vote Percentage
            <CaretSortIcon className="ml-2 h-4 w-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("vote_percentage")}
        </div>
      ),
    },
    {
        accessorKey: "partyname",
        header: ({ column }) => {
            return (
            <Button
                variant="ghost"
                className="capitalize   text-lg"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Party Name
                <CaretSortIcon className="ml-2 h-4 w-2" />
            </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize  text-center">
            {row.getValue("partyname")}
            </div>
        ),
        },
        {
        accessorKey: "election_type",
        header: ({ column }) => {
            return (
            <Button
                variant="ghost"
                className="capitalize  text-lg"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Election Type
                <CaretSortIcon className="ml-2 h-4 w-2" />
            </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize text-center">
            {row.getValue("election_type")}
            </div>
        ),
    }
    
  ];

  export function DataTableDemo({ data }) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
  
    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    });
  
    return (
      <div className="w-full">
        <div className="w-full">
          <Input
            placeholder="Filter names..."
            value={table.getColumn("cand_name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("cand_name")?.setFilterValue(event.target.value)
            }
            className="max-w-lg h-12"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto text-lg my-4">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-lg"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full h-full">
          <Table className="w-full text-lg">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-gray-200 h-20 mr-24 ml-12 "
                >
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={
                          index === columns.length - 2
                            ? "w-1/5 p-2 h-full text-lg"
                            : index === columns.length - 1
                            ? "w-1/5 p-2 h-full text-lg"
                            : "w-1/4 p-2 h-full text-lg"
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="w-full mx-auto bg-gray-50 hover:bg-gray-200 h-16 pl-10 "
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={
                          index === row.getVisibleCells().length - 2
                            ? "w-1/5 p-2 h-full"
                            : index === row.getVisibleCells().length - 1
                            ? "w-1/5 p-2 h-full"
                            : "w-1/4 p-2 h-full"
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4 text-white">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
const queryClient = new QueryClient();
const Tables = (
    { partyname }
) => {
    const fetchCandidateDetails = async () => {
        const acResponse = await fetch(`http://localhost:8000/api/candidatedetailsinac/${partyname}`);
        const acData = await acResponse.json();
        const pcResponse = await fetch(`http://localhost:8000/api/candidatedetailsinpc/${partyname}`);
        const pcData = await pcResponse.json();
    
        return [...acData.map(item => ({ ...item, election_type: 'Assembly' })), 
                ...pcData.map(item => ({ ...item, election_type: 'Parliamentary' }))];
      };
    
      const { data, isLoading, error } = useQuery('candidateDetails', fetchCandidateDetails);
    
      if (isLoading) return 'Loading...';
      if (error) return 'An error has occurred: ' + error.message;
      console.log("dfdsgfdsg")
      console.log(data)
  return (
    <div>
         <DataTableDemo data={data} />
        </div>
  )
}

const WrappedTables = (props) => (
    <QueryClientProvider client={queryClient}>
      <Tables {...props} />
    </QueryClientProvider>
  );
  
  export default WrappedTables;