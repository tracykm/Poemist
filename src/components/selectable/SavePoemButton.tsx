import { Mutation, ExecutionResult } from "react-apollo";
import * as React from "react";
import getSelectedTexts from "src/utils/getSelectedTexts";
import Loader from "src/components/universal/Loader";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ISelectablePoem, IPoem, ITextChunk } from "../types";
import {
  UPDATE_POEM,
  CREATE_POEM,
  ICreatePoemResp,
  IUpdatePoemResp,
} from "./poemMutations";
import { GET_USER } from "../manyPoemViews/ProfileView";

interface IProps extends RouteComponentProps<{ id: string }> {
  children?: ({ onClick }: { onClick: () => void }) => JSX.Element;
  poem: ISelectablePoem | IPoem;
  styleView?: boolean;
}

const SavePoemButton = ({ history, poem, children, styleView }: IProps) => (
  <Mutation
    mutation={poem.id ? UPDATE_POEM : CREATE_POEM}
    refetchQueries={[
      "GetPoems",
      { query: GET_USER, variables: { id: poem.author && poem.author.id } },
    ]}
  >
    {(
      savePoem,
      // @ts-ignore - says loading not there but it is
      { data, loading }: ExecutionResult<ICreatePoemResp | IUpdatePoemResp>,
    ) => {
      if (loading)
        return (
          <div style={{ background: "black" }}>
            <Loader />
          </div>
        );
      if (!children) return;
      let textChunks: ITextChunk[];
      if (styleView && poem.textChunks) {
        // remove _type
        textChunks = poem.textChunks.map(t => ({
          isSelected: t.isSelected,
          text: t.text,
        }));
      } else {
        textChunks = getSelectedTexts((poem as ISelectablePoem).wordLetters);
      }

      return children({
        onClick: () => {
          savePoem({
            variables: {
              textChunks,
              id: poem && poem.id,
              passage: poem.passage,
              backgroundId: poem.backgroundId,
              colorRange: poem.colorRange,
            },
          })
            .then(res => {
              if (!res) return;
              if (!res.data) return;
              const newPoem =
                (res.data as ICreatePoemResp).createPoem ||
                (res.data as IUpdatePoemResp).updatePoem;
              if (styleView) {
                history.push(`/`);
              } else {
                history.push(`/edit/stylize/${newPoem.id}`);
              }
            })
            .catch(res => {
              history.push("?showLogin=true");
            });
        },
      });
    }}
  </Mutation>
);

export default withRouter(SavePoemButton);
