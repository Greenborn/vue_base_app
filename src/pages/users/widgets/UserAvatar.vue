<script setup>
const avatarColor = (userName) => {
  const colors = ["primary", "#FFD43A", "#ADFF00", "#262824", "danger"];
  const index = userName.charCodeAt(0) % colors.length;
  return colors[index];
};

const props = defineProps(["user", "size"]);

const isUrl = (avatar) => {
  if (!avatar) return false;

  return avatar.startsWith("http") || avatar.startsWith("blob:");
};

</script>

<template>
  <VaAvatar
    :size="size"
    :src="isUrl(user.avatar) ? user.avatar : ''"
    :fallback-text="user.username"
    :color="avatarColor(user.username)"
  />
</template>
