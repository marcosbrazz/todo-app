FROM registry.access.redhat.com/ubi8:8.0

# Pode ser sobrescrito com "docker run -e BACKEND_HOST=localhost:8100 ..."
ENV BACKEND_HOST=localhost:8000

RUN yum install -y --disableplugin=subscription-manager --nodocs nginx nginx-mod-http-perl && \
    yum clean all

COPY nginx.conf /etc/nginx/

RUN touch /run/nginx.pid && \
    chgrp -R nginx /var/log/nginx /run/nginx.pid && \
    chmod -R g+rwx /var/log/nginx /run/nginx.pid
  
COPY src/ /usr/share/nginx/html

USER nginx

CMD nginx -g "daemon off;"

