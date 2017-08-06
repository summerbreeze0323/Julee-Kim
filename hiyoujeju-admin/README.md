개요
====

* 아마존 S3(Simple Storage Service)에서 지원하는 '정적 웹사이트 호스팅' 기능을 이용해 서비스됩니다.

    * 비트버킷 파이프라인 구성을 통해 저장소 변경이 자동으로 반영됩니다.

    * 원격 저장소에 변화가 생기면 S3 버킷에 저장소 내용이 업로드됩니다.

    * bitbucket-pipelines.yml 파일을 참고하세요.

* s3auth 서비스를 이용해 Basic HTTP Authentication 기능을 활성화했습니다.

    * S3는 해당 기능을 지원하지 않기 때문에 써드파티 웹서비스를 사용했습니다.

    * DNS 릴레이를 통해 동작하기 때문에 다소 느립니다.

    * 이후 로그인 기능을 구현하면 해당 서비스를 더 이상 사용하지 않습니다.


링크
=====


- http://www.s3auth.com/

- https://www.sslforfree.com/

- http://admin.hiyoujeju.snapbak-studios.com