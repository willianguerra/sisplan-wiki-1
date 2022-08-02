import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { ClientesProps } from "../@types/ClientsProps";
import { useTheme } from "next-themes";
import {
  ArrowLineLeft,
  ArrowLineRight,
  CaretLeft,
  CaretRight,
} from "phosphor-react";

createTheme("table", {
  background: {
    default: "transparent",
  },
  text: {
    primary: "var(--font-color)",
    secondary: "var(--font-color)",
  },
});

const paginationComponentOptions = {
  rowsPerPageText: "Linhas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

export function ClientsTable({ clientes }: ClientesProps) {
  const { theme, setTheme } = useTheme();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const columns = [
    {
      name: "Código Cliente",
      selector: (row) => row.CODCLI,
      sortable: true,
    },
    {
      name: "Nome Cliente",
      selector: (row) => row.NOME,
      sortable: true,
    },
    ,
    {
      name: "CNPJ",
      selector: (row) => row.CNPJ,
      sortable: true,
    },
    {
      name: "Data Versão",
      selector: (row) => row.dataVersao,
      sortable: true,
    },
    {
      name: "Versão",
      selector: (row) => row.versao,
      sortable: true,
    },
  ];

  return (
    <DataTable
      theme={"table"}
      columns={columns}
      data={clientes}
      pagination
      paginationRowsPerPageOptions={[15]}
      paginationPerPage={15}
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      persistTableHead
      paginationComponentOptions={paginationComponentOptions}
      noDataComponent={
        <Flex alignItems="center" h={16}>
          Nenhum registro encontrado!
        </Flex>
      }
      paginationIconFirstPage={
        <Flex justifyContent="center" w="100%">
          <ArrowLineLeft color={theme == "dark" ? "#000" : "#fff"} />
        </Flex>
      }
      paginationIconLastPage={
        <Flex justifyContent="center" w="100%">
          <ArrowLineRight color={theme == "dark" ? "#000" : "#fff"} />
        </Flex>
      }
      paginationIconNext={
        <Flex justifyContent="center" w="100%">
          <CaretRight color={theme == "dark" ? "#000" : "#fff"} />
        </Flex>
      }
      paginationIconPrevious={
        <Flex justifyContent="center" w="100%">
          <CaretLeft color={theme == "dark" ? "#000" : "#fff"} />
        </Flex>
      }
    />
  );
}
