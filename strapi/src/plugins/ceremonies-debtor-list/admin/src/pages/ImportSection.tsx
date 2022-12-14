import React, { useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Box, Button, Loader, Stack, Typography } from "@strapi/design-system";
import { useNotification } from "@strapi/helper-plugin";

const updateUrls = {
  debtors: "/ceremonies-debtor-list/update-debtors",
  ceremonies: "/ceremonies-debtor-list/update-ceremonies",
  disclosures: "/ceremonies-debtor-list/update-disclosures",
};

const headerTexts = {
  debtors: "Import dlžníkov",
  ceremonies: "Import obradov",
  disclosures: "Import zverejňovania",
};

type ImportSectionProps = {
  type: "debtors" | "ceremonies" | "disclosures";
};

const ImportSection = ({ type }: ImportSectionProps) => {
  const toggleNotification = useNotification();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    axiosInstance
      .put(updateUrls[type], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toggleNotification({
          type: "success",
          message: { defaultMessage: response.data.message },
        });
      })
      .catch((error) => {
        toggleNotification({
          type: "warning",
          message: {
            defaultMessage: error?.response?.data?.message ?? error.toString(),
          },
          blockTransition: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      background="neutral0"
      hasRadius
      shadow="filterShadow"
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={7}
      paddingRight={7}
    >
      <Stack spacing={4}>
        <Typography variant="delta" as="h2">
          {headerTexts[type]}
        </Typography>
        {loading && <Loader />}
        <input type="file" ref={inputFileRef} />
        <div>
          <Button onClick={handleSubmit} disabled={loading}>
            Nahrať
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default ImportSection;
