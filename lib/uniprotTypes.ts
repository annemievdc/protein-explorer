export type UniProtType = {
  primaryAccession: string;

  proteinDescription: {
    recommendedName?: {
      fullName: {
        value: string;
      };
    };
  };

  genes?: {
    geneName?: {
      value: string;
    };
  }[];

  organism: {
    scientificName: string;
  };

  sequence: {
    length: number;
    value: string;
  };
};