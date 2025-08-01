import React from "react";
import AccountProfile from "./AccountProfile";
import AccountSettings from "./AccountSettings";

const AccountMainContent = ({
  userInfo,
  isEditing,
  notifications,
  onToggleEdit,
  onInputChange,
  onToggleSwitch,
  onSave,
  onCancel,
}) => {
  return (
    <div className="main_container background_blur">
      {/* Profile Section */}
      <AccountProfile
        userInfo={userInfo}
        isEditing={isEditing}
        onToggleEdit={onToggleEdit}
        onInputChange={onInputChange}
        onSave={onSave}
        onCancel={onCancel}
      />

      {/* Settings Section
      <AccountSettings
        notifications={notifications}
        onToggleSwitch={onToggleSwitch}
      /> */}
    </div>
  );
};

export default AccountMainContent;
