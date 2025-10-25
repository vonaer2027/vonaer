'use client'

import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TermsPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-background text-foreground min-h-screen">
      <VonaerHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      <VonaerMenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              위치기반서비스 이용약관
            </h1>

            <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제1조 (목적)</h2>
                <p className="leading-relaxed">
                  본 약관은 회원(본에어 서비스 약관에 동의한 개인위치정보주체를 말하며, 이하 "회원")이 주식회사 모비에이션(이하 "회사")이 제공하는 서비스(이하 "서비스")를 이용함에 있어 회사와 회원의 권리/의무 및 책임사항의 규정함을 목적으로 합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제2조 (이용약관의 효력 및 변경)</h2>
                <p className="leading-relaxed">
                  본 약관은 서비스를 신청한 고객 또는 개인위치정보주체가 본 약관에 동의하고 회사가 정한 소정의 절차에 따라 서비스의 이용자로 등록함으로써 효력이 발생합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시하거나 기타의 방법으로 공지합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 필요하다고 인정되면 본 약관을 변경할 수 있으며, 회사가 약관을 개정할 경우에는 기존약관과 개정약관 및 개정약관의 적용일자와 개정사유를 명시하여 현행약관과 함께 적용일자 7일 전부터 적용일 이후 상당한 기간 동안 공지합니다. 다만, 개정 내용이 회원에게 불리한 경우에는 그 적용일자 30일 전부터 적용일 이후 상당한 기간 동안 각각 이를 홈페이지에 게시하거나 회원에게 전자적 형태(전자우편, SMS 등)로 약관 개정 사실을 발송하여 고지합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사가 전항에 따라 회원에게 공지하거나 통지하면서 공지 또는 통지ㆍ고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 불구하고 거부의 의사표시가 없는 경우에는 변경된 약관에 승인한 것으로 봅니다. 회원이 개정약관에 동의하지 않을 경우 회원은 이용계약을 해지할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제3조 (약관 외 준칙)</h2>
                <p className="leading-relaxed">
                  본 약관에 규정되지 않은 사항에 대해서는 위치정보의 보호 및 이용 등에 관한 법률(이하 "위치정보법"이라고 합니다), 전기통신사업법, 정보통신망 이용촉진 및 보호 등에 관한 법률(이하 "정보통신망법"이라고 합니다), 개인정보보호법 등 관련법령 또는 회사가 정한 서비스의 운영정책 및 규칙 등(이하 "세부지침"이라고 합니다)의 규정에 따르며, 개인정보 처리기준 및 보호조치 등에 관한 사항은 개인정보 처리방침을 통해 공개합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제4조 (서비스의 내용 등)</h2>
                <p className="leading-relaxed">
                  회사가 제공하는 위치기반서비스 및 개인위치정보의 보유목적과 기간은 아래와 같습니다.
                </p>

                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left">서비스명</th>
                        <th className="border border-border px-4 py-2 text-left">서비스 내용 및 보유 목적</th>
                        <th className="border border-border px-4 py-2 text-left">보유﹒이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">본에어 위치기반서비스</td>
                        <td className="border border-border px-4 py-2">위치정보를 이용한 주소 검색</td>
                        <td className="border border-border px-4 py-2">이용 목적 달성 시 즉시 파기</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제5조 (서비스의 가입)</h2>
                <p className="leading-relaxed">
                  회사는 아래와 같은 경우에는 이용자의 가입신청을 승낙하지 않을 수 있습니다.
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>실명이 아니거나 다른 사람의 명의를 사용하는 등 허위로 신청하는 경우</li>
                  <li>회원 등록 사항을 빠뜨리거나 잘못 기재하여 신청하는 경우</li>
                  <li>기타 회사가 정한 이용신청 요건을 충족하지 않았을 경우</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  회원은 등록사항에 대하여 추가 입력 또는 변경을 하는 경우 "내 정보 수정" 항목을 통해 직접 등록 및 수정함으로써 최신 정보가 유지되도록 하여야 합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회원가입신청서에 기입한 모든 정보는 실제 데이터인 것으로 간주되며 실제 정보를 입력하지 않거나 수정하지 않음으로 인해 발생하는 불이익 회원이 부담하게 됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제6조 (서비스의 해지)</h2>
                <p className="leading-relaxed">
                  회원이 서비스 이용을 해지하고자 할 경우 회원은 회사가 정한 절차를 통해 서비스 해지를 신청할 수 있으며, 회사는 법령이 정하는 바에 따라 신속히 처리합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제7조 (서비스의 내용)</h2>
                <p className="leading-relaxed">
                  서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사의 업무 또는 기술상의 이유로 서비스가 일시 중지될 수 있으며, 운영상의 목적으로 회사가 정한 기간에도 서비스는 일시 중지될 수 있습니다. 이때 회사는 사전 또는 사후에 이를 공지합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제8조 (서비스 이용요금)</h2>
                <p className="leading-relaxed">
                  회사는 유료 서비스 이용요금을 회사와 계약한 전자지불업체에서 정한 방법에 의하거나 회사가 정한 청구서에 합산하여 청구할 수 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  유료서비스 이용을 통하여 결제된 대금에 대한 취소 및 환불은 회사의 결제 이용약관 등 관계법령에 따릅니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회원의 개인정보도용 및 결제사기로 인한 환불요청 또는 결제자의 개인정보 요구는 법률이 정한 경우 외에는 거절될 수 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  무선 서비스 이용 시 발생하는 데이터 통신료는 별도이며 가입한 각 이동통신사의 정책에 따릅니다.
                </p>
                <p className="leading-relaxed mt-4">
                  MMS 등으로 게시물을 등록할 경우 발생하는 요금은 회원이 가입한 각 이동통신사의 정책에 따릅니다
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제9조 (서비스의 이용제한 및 중지)</h2>
                <p className="leading-relaxed">
                  회사는 아래 각 호의 경우에는 회원의 서비스 이용을 제한하거나 중지시킬 수 있습니다.
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>회원이 회사 서비스의 운영을 고의 또는 중과실로 방해하는 경우</li>
                  <li>서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우</li>
                  <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
                  <li>국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 때</li>
                  <li>기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  회사는 전항의 규정에 의하여 서비스의 이용을 제한하거나 중지한 때에는 그 사유 및 제한기간 등을 회원에게 알려야 합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  서비스는 위치정보에 기반한 서비스로 일부 오차가 발생할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제10조 (개인위치정보의 이용 또는 제공)</h2>
                <p className="leading-relaxed">
                  회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는 경우에는 미리 약관에 명시한 후 개인위치정보주체의 동의를 얻어야 합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 제3자에게 개인위치정보를 제공하는 경우에는, 제공 받는자 및 제공목적을 사전에 개인위치정보주체에게 고지하고 동의를 받습니다. 다만, 다음의 경우는 예외로 합니다.
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제11조 (개인위치정보의 보유목적 및 보유기간)</h2>
                <p className="leading-relaxed">
                  회사는 위치정보 및 위치기반서비스를 제공하기 위해 필요한 최소한의 개인위치정보를 보유 및 이용하며, 개인위치정보의 보유목적은 VON프라이빗 요청에 따릅니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 회원의 개인위치정보를 이용한 경우 위치정보법에 의하여 기록·보존하여야 하는 위치정보 이용·제공사실 확인자료 및 해당 개인위치정보를 회원 탈퇴 및 서비스 종료 시 지체 없이 파기합니다. 단, 관련 법령에 의한 보관이 필요한 경우 해당 기간만큼 보관합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제12조 (위치정보 수집·이용·제공사실 확인자료의 보유)</h2>
                <p className="leading-relaxed">
                  회사는 위치정보법 제16조 제2항에 근거하여 다른 사업자 또는 이용 고객과 요금정산 및 민원처리를 위해 위치정보 수집, 이용, 제공사실 확인자료를 위치정보시스템에 자동으로 기록하며, 해당 자료는 최소 6개월간 보존합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 위치정보법 제24조 제4항에 따라 개인위치정보주체가 수집, 이용, 제공 동의의 전부 또는 일부를 철회한 경우 회사는 수집한 개인위치정보 및 수집ㆍ이용ㆍ제공사실 확인자료(동의의 일부를 철회하는 경우에는 철회하는 부분의 개인위치정보 및 위치정보 이용ㆍ제공사실 확인자료에 한합니다.)를 즉시 파기합니다 . 단, 관련 법령의 규정에 따라 보존할 필요가 있을 때에는 해당 법령에서 정한 바에 따라 보존합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제13조 (개인위치정보주체의 권리)</h2>
                <p className="leading-relaxed">
                  회원은 회사에 대하여 언제든지 개인위치정보를 이용한 위치기반서비스 제공 및 개인위치정보의 제3자 제공에 대한 동의의 전부 또는 일부를 철회할 수 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회원은 회사에 대하여 언제든지 개인위치정보의 수집, 이용 또는 제공의 일시적인 중지를 요구할 수 있으며, 회사는 이를 거절할 수 없고 이를 위한 기술적 수단을 갖추고 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회원은 회사에 대하여 아래 각 호의 자료에 대한 열람 또는 고지를 요구할 수 있고, 당해 자료에 오류가 있는 경우에는 그 정정을 요구할 수 있습니다. 이 경우 회사는 정당한 사유 없이 회원의 요구를 거절할 수 없습니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>본인에 대한 위치정보 수집, 이용, 제공사실 확인자료</li>
                  <li>본인의 개인위치정보가 위치정보의 보호 및 이용 등에 관한 법률 또는 다른 법률 규정에 의하여 제3자에게 제공된 이유 및 내용</li>
                </ol>
                <p className="leading-relaxed mt-4">
                  회원은 제1항 내지 제3항의 권리행사를 위해 회사의 소정의 절차를 통해 요구할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제14조 (위치정보관리책임자의 지정)</h2>
                <p className="leading-relaxed">
                  회사는 위치정보를 적절히 관리, 보호하고 개인위치정보주체의 불만을 원활히 처리할 수 있도록 실질적인 책임을 질 수 있는 지위에 있는 자를 위치정보관리책임자로 지정해 운영합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  위치정보관리책임자는 위치기반서비스를 제공하는 부서의 부서장으로서 구체적인 사항은 본 약관의 제18조에 따릅니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제15조 (손해배상)</h2>
                <p className="leading-relaxed">
                  회사가 위치정보의 보호 및 이용 등에 관한 법률 제15조 내지 제26조의 규정을 위반한 행위로 회원에게 손해가 발생한 경우 회원은 회사에 대하여 손해배상 청구를 할 수 있습니다. 이 경우 회사는 고의, 과실이 없음을 입증하지 못하는 경우 책임을 면할 수 없습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회원이 본 약관의 규정을 위반하여 회사에 손해가 발생한 경우 회사는 회원에 대하여 손해배상을 청구할 수 있습니다. 이 경우 회원은 고의, 과실이 없음을 입증하지 못하는 경우 책임을 면할 수 없습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제16조 (면책)</h2>
                <p className="leading-relaxed">
                  회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여 회원에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우</li>
                  <li>서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우</li>
                  <li>회원의 귀책사유로 서비스 이용에 장애가 있는 경우</li>
                  <li>서비스의 약관이 금지하는 행위 또는 법령, 공서양속 등에 반하는 행위를 하는 경우</li>
                  <li>제1호 내지 제3호를 제외한 기타 회사의 고의, 과실이 없는 사유로 인한 경우</li>
                </ol>
                <p className="leading-relaxed mt-4">
                  회사는 서비스 및 서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 보증을 하지 않으며 이로 인해 발생한 회원의 손해에 대하여는 책임을 부담하지 아니합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제17조 (규정의 준용)</h2>
                <p className="leading-relaxed">
                  본 약관은 대한민국법령에 의하여 규정되고 이행됩니다.
                </p>
                <p className="leading-relaxed mt-4">
                  본 약관에 규정되지 않은 사항에 대해서는 관련법령 및 상관습에 의합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제18조 (분쟁의 조정 및 기타)</h2>
                <p className="leading-relaxed">
                  회사는 위치정보와 관련된 분쟁에 대해 당사자간 협의가 이루어지지 아니하거나 협의를 할 수 없는 경우에는 위치정보의 보호 및 이용 등에 관한 법률 제28조의 규정에 의한 방송통신위원회에 재정을 신청할 수 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사 또는 고객은 위치정보와 관련된 분쟁에 대해 당사자간 협의가 이루어지지 아니하거나 협의를 할 수 없는 경우에는 개인정보보호법 제43조의 규정에 의한 개인정보분쟁조정위원회에 조정을 신청할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제19조 (사업자 정보 및 위치정보관리책임자)</h2>
                <div className="leading-relaxed space-y-2">
                  <p>상호: 주식회사 모비에이션</p>
                  <p>주소: 서울 강남구 테헤란로 87길 22 한국도심공항 2층 205호</p>
                  <p>대표전화: 02-6012-9500</p>
                  <p>위치정보관리책임자: 박성호</p>
                  <p>이메일: ti@moviationair.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">부칙</h2>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">제1조(약관의 효력)</h3>
                <p className="leading-relaxed">
                  본 약관은 2024년 7월 3일부터 시행하며, 본 약관이 시행되기 이전에 서비스 회원으로 가입한 대상에게도 적용됩니다. 또한 개정된 약관은 적용일자 이전에 체결된 계약에 대해서도 적용됨을 원칙으로 합니다.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">제2조(약관의 개정)</h3>
                <p className="leading-relaxed">
                  회사는 대한민국의 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 소비자기본법, 전자상거래등에서의 소비자 보호에 관한 법률, 개인정보보호법 등 관련법규를 준수합니다. 따라서 회원 약관은 대한민국 관련법규개정 및 정부지침의 변경으로 인하여 그 내용이 변경될 수 있습니다. 약관 개정 시 개정일자, 개정이유, 개정내용 등을 서비스에 공시합니다.
                </p>
              </section>

              <section className="mt-12 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  공지일자: 2024년 7월 3일<br />
                  시행일자: 2024년 7월 3일
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <VonaerFooter />
    </div>
  )
}
