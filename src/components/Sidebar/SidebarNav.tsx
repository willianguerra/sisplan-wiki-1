import { useEffect, useState } from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { ClipLoader } from "react-spinners";

import { Flex, Stack } from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Note, Upload, UserList } from "phosphor-react";

import { useGetTypesQuery } from "../../graphql/generated";
import { listaUsuariosLiberados } from "../../lib/users";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
declare global {
  interface Array<T> {
    groupBy(elem: string): Array<T>;
  }
}


Array.prototype.groupBy = function (prop) {
  return this.reduce(function (groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};


export function SidebarNav() {
  const [existeUser, setExisteUser] = useState<boolean>(false);
  const [types, setTypes] = useState<any[]>();
  const [urlDownloadAtualizador, setUrlDownloadAtualizador] = useState("");
  const usuarioLogado = parseCookies(undefined);

  useEffect(() => {
    setExisteUser(
      listaUsuariosLiberados.includes(usuarioLogado.usuario.toUpperCase()) ==
      true
    );

    async function urlDownloadAtualizador() {
      const response = await axios.get("/api/atualizador");
      setUrlDownloadAtualizador(response.data);
    }

    urlDownloadAtualizador();
  }, [usuarioLogado.usuario]);

  const { data } = useGetTypesQuery();

  useEffect(() => {
    if (data) {
      const testeResult = data.post.groupBy('type');
      setTypes(Object.entries(testeResult));
    }
  }, [data]);
  if (!data) {
    return <div></div>;
  }
  if (!usuarioLogado) {
    return <div></div>;
  }

  if (!data) {
    return (
      <Stack spacing="12" align="flex-start" position={"fixed"}>
        <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent='center'>
          <LoadingOverlayWrapper
            active={true}
            spinner={<ClipLoader color="red" />}
          />
        </Flex>
      </Stack>

    );
  }


  return (
    <Stack spacing="12" align="flex-start" position={"fixed"}>
      {existeUser && (
        <NavSection title="Administração">
          <NavLink icon={UserList} href="/clientes">
            Clientes
          </NavLink>
        </NavSection>
      )}

      <NavSection title="Posts">
        {types ? (
          types.map((type, i) => {
            return (
              <NavLink key={i} icon={Note} href={`/posts?type=${String(type[0])}`}>
                {String(type[0])}
              </NavLink>
            );
          })
        ) : (
          <div></div>
        )}
      </NavSection>

      <NavSection title="Downloads Arquivos">
        <NavLink icon={Upload} href={urlDownloadAtualizador}>
          Atualizador
        </NavLink>
      </NavSection>
    </Stack>
  );
}
