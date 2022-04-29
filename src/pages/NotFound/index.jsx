import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t: $t } = useTranslation();
  const navigate = useNavigate();

  const handleBackHomeClick = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle={$t("pages.not_found.sub_title")}
      extra={
        <Button type="primary" onClick={handleBackHomeClick}>
          {$t("pages.not_found.back_home_btn")}
        </Button>
      }
    />
  );
}

export default NotFoundPage;
