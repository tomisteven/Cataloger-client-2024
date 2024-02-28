import React from "react";

export function WebPrincipal() {
  return (
    <div>
      <button onClick={
        () => {
          window.location.href = "#/admin/datos-negocio";
        }
      }>Login</button>
    </div>
  );
}
