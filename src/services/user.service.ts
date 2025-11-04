import api from "./api";

interface ChangePasswordData {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export const changePassword = async (data: ChangePasswordData) => {
  try {
    const response = await api.post("/accounts/change_password/", data);
    return response.data;
  } catch (error) {
    console.error("Falha ao alterar a senha:", error);
    throw error;
  }
};

export const updateUserProfilePicture = async (imageUri: string) => {
  const formData = new FormData();

  const fileName = imageUri.split("/").pop() || "profile.jpg";
  const fileType = `image/${fileName.split(".").pop()?.toLowerCase()}`;

  formData.append("profile_picture", {
    uri: imageUri,
    name: fileName,
    type: fileType,
  } as any);

  try {
    const response = await api.patch("/accounts/profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Falha ao atualizar a foto de perfil:", error);
    throw error;
  }
};