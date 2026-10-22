ARG IMAGE
FROM ${IMAGE}
# The base image ships no system CA store.
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs/ca-certificates.crt
# Node otherwise trusts its compiled-in roots instead of the system store.
ENV NODE_OPTIONS=--use-openssl-ca
